import classNames from 'classnames';
import { DraftHandleValue, Editor, EditorState, Modifier } from 'draft-js';
import noop from 'lodash-es/noop';
import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown } from '../Dropdown';
import { useControllable } from '../useControllable';
import styles from './RichTextEditor.module.css';
import { ClassName, Option } from '../types';
import { InsertLinkParams } from './types';
import {
  emptyValue,
  getCurrentBlock,
  getMentionTrigger,
  getPlainTextWithInterpolatedMentionValue,
  replaceText,
} from './utils';
import { DomUtils } from '../utils';
import { useVisibilityControl } from '../useVisibilityControl';
import { useOnClickOutside } from '../useOnClickOutside';

export type RichTextEditorRef = {
  insertMention: (option: Option) => void;
  insertText: (text: string) => void;
  getPlainTextWithInterpolatedMentionValue: () => string;
  getHtml: () => string;
  insertLink: (data: InsertLinkParams) => void;
};

export type RichTextEditorProps = ClassName & {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  placeholder?: string;
  ref?: RichTextEditorRef;
  singleLine?: boolean;
  mentionOptions?: Option<string, string>[];
  readOnly?: boolean;
  styleless?: boolean;
  label?: React.ReactNode;
};

export const RichTextEditor = React.forwardRef(
  (
    {
      mentionOptions = [],
      singleLine,
      value,
      onChange,
      readOnly = false,
      placeholder,
      className,
      styleless,
      label,
    }: RichTextEditorProps,
    ref: any
  ) => {
    const [editorState, setEditorState] = useControllable<EditorState>({
      value,
      onChange,
      defaultValue: emptyValue,
    }) as [EditorState, (editorState: EditorState) => void];
    const [triggerNode, setTriggerNode] = React.useState<any>(null);
    const [mentionQuery, setMentionQuery] = React.useState('');
    const editorRef = React.useRef<any>(null);
    const dropdownRef = React.useRef<any>(null);

    const mentionCloseForcer = useVisibilityControl();
    const dropdownControl = useVisibilityControl();

    const insertMention = React.useCallback(
      (option: Option<string, string>) => {
        const newEditorState = replaceText({
          editorState,
          newText: option.label,
          data: option,
          entityType: 'MENTION',
          mutability: 'IMMUTABLE',
        });

        setEditorState(newEditorState);
      },
      [editorState, setEditorState]
    );

    const insertText = React.useCallback(
      (text: string) => {
        const newEditorState = replaceText({ editorState, newText: text });

        setEditorState(newEditorState);
      },
      [editorState, setEditorState]
    );

    const insertLink = React.useCallback(
      (data: InsertLinkParams) => {
        const newEditorState = replaceText({
          editorState,
          newText: data.text ?? data.href,
          data,
          entityType: 'LINK',
          mutability: 'IMMUTABLE',
        });

        setEditorState(newEditorState);
      },
      [editorState, setEditorState]
    );

    const _getPlainTextWithInterpolatedMentionValue = React.useCallback(() => {
      return getPlainTextWithInterpolatedMentionValue(editorState);
    }, [editorState]);

    const getHtml = React.useCallback(() => {
      return editorRef.current?.editorContainer.innerHTML;
    }, []);

    React.useImperativeHandle(ref, () => ({
      insertMention,
      insertText,
      getPlainTextWithInterpolatedMentionValue: _getPlainTextWithInterpolatedMentionValue,
      getHtml,
      insertLink,
    }));

    const closeMentionSuggestions = React.useCallback(
      (force?: boolean) => {
        setTriggerNode(null);
        setMentionQuery('');
        dropdownControl.close();

        if (force) {
          mentionCloseForcer.open();
        }
      },
      [dropdownControl, mentionCloseForcer]
    );

    const applyMentionTriggerEntityIfAny = React.useCallback(
      (editorState: EditorState): EditorState => {
        const currentBlock = getCurrentBlock(editorState);
        const anchorOffset = editorState.getSelection().getAnchorOffset();
        const textUntilAnchor = currentBlock?.getText().slice(0, anchorOffset);
        const lastAtCharacter = textUntilAnchor?.lastIndexOf('@');

        if (
          !currentBlock ||
          mentionCloseForcer.visible ||
          lastAtCharacter === -1 ||
          lastAtCharacter === undefined ||
          textUntilAnchor === undefined
        ) {
          closeMentionSuggestions();
          return editorState;
        }

        for (let offset = lastAtCharacter; offset < anchorOffset; offset++) {
          const currentEntityKey = currentBlock.getEntityAt(offset);

          const currentEntity = currentEntityKey
            ? editorState.getCurrentContent().getEntity(currentEntityKey)
            : undefined;

          if (currentEntity && currentEntity.getType() !== 'MENTION_TRIGGER') {
            closeMentionSuggestions();
            return editorState;
          }
        }

        const { content } = getMentionTriggerData(editorState);
        setMentionQuery(content.slice(1));
        dropdownControl.open();

        const mentionTriggerContent = textUntilAnchor.slice(lastAtCharacter, anchorOffset);

        return replaceText({
          editorState,
          entityType: 'MENTION_TRIGGER',
          mutability: 'MUTABLE',
          start: lastAtCharacter,
          end: anchorOffset,
          newText: mentionTriggerContent,
        });
      },
      [closeMentionSuggestions, dropdownControl, mentionCloseForcer.visible]
    );

    const handleChange = (newEditorState: EditorState) => {
      const transformedEditorState = applyMentionTriggerEntityIfAny(newEditorState);
      setEditorState(transformedEditorState);
      mentionCloseForcer.close();
    };

    const getMentionTriggerData = (editorState: EditorState) => {
      const plainText = getCurrentBlock(editorState)!.getText()!;
      const anchorOffset = editorState.getSelection().getAnchorOffset();
      const start = plainText.slice(0, anchorOffset).lastIndexOf('@');

      return {
        start,
        content: plainText.slice(start, anchorOffset),
      };
    };

    const handleDropdownSelect = (_: string, selectedOption: Option) => {
      const { start } = getMentionTriggerData(editorState);

      const newEditorState = replaceText({
        editorState,
        entityType: 'MENTION',
        start,
        end: editorState.getSelection().getAnchorOffset(),
        newText: selectedOption.label as string,
        mutability: 'IMMUTABLE',
        data: selectedOption,
      });

      setEditorState(newEditorState);
    };

    const detectActiveTriggerNode = React.useCallback(() => {
      const mentionTrigger = getMentionTrigger();
      if (mentionCloseForcer.visible || !mentionTrigger) return;

      setTriggerNode(mentionTrigger);
    }, [mentionCloseForcer.visible]);

    React.useEffect(() => {
      detectActiveTriggerNode();
    }, [detectActiveTriggerNode, editorState]);

    const handleReturn = (): DraftHandleValue => {
      if (dropdownControl.visible || singleLine) {
        return 'handled';
      }

      return 'not-handled';
    };

    const filteredMentionOptions = mentionOptions.filter(({ label }) =>
      label?.toLocaleLowerCase().includes(mentionQuery.toLocaleLowerCase())
    );

    // https://github.com/facebook/draft-js/issues/657
    // https://jsfiddle.net/orir/m6z0xn4r/317/
    const handlePaste = (
      text: string,
      html: string | undefined,
      editorState: EditorState
    ): DraftHandleValue => {
      setEditorState(
        EditorState.push(
          editorState,
          Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            text.replace(/\n/g, ' ')
          ),
          'insert-characters'
        )
      );

      requestAnimationFrame(() => {
        // eslint-disable-next-line react/no-find-dom-node
        const editorNode = ReactDOM.findDOMNode(editorRef.current!)! as Element;
        const scrollingContainer = editorNode.querySelector('.public-DraftStyleDefault-block')!;
        const context = document.createElement('canvas').getContext('2d')!;
        context.font = window.getComputedStyle(editorNode).font;

        const textUpToEndOfPaste = editorState
          .getCurrentContent()
          .getPlainText(' ')
          .substring(0, editorState.getSelection().getFocusOffset());
        const pastedTextWidthOffset = context.measureText(textUpToEndOfPaste);

        scrollingContainer.scrollLeft = pastedTextWidthOffset.width - editorNode.clientWidth / 2;
      });

      return 'handled';
    };

    useOnClickOutside([dropdownRef, editorRef.current?.editorContainer], () => {
      closeMentionSuggestions();
    });

    if (DomUtils.isServer()) return null;

    return (
      <div
        className={classNames(
          'rich-text-editor',
          'w-full',
          {
            [styles['rich-text-editor']]: singleLine,
            'min-h-[100px]': !singleLine,
          },
          className
        )}
      >
        <input className='minimized' ref={ref} />
        {!!label && <label className='block mb-1 text-gray-5'>{label}</label>}
        <div
          onClick={() => editorRef.current?.focus()}
          className={classNames({
            'w-full p-2 bg-white rounded border border-input border-solid focus:border-input':
              !styleless,
          })}
        >
          <Editor
            placeholder={placeholder}
            ref={editorRef}
            editorState={editorState}
            onChange={readOnly ? noop : handleChange}
            handleReturn={handleReturn}
            onEscape={() => closeMentionSuggestions(true)}
            handlePastedText={singleLine ? handlePaste : undefined}
            readOnly={readOnly}
          />
          {!readOnly && (
            <Dropdown
              ref={dropdownRef}
              closeOnClickOutside={false}
              trigger={triggerNode!}
              control={dropdownControl}
              placement='right-start'
              options={filteredMentionOptions}
              onSelect={handleDropdownSelect}
            />
          )}
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
