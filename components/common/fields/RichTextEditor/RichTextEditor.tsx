import React from 'react';

import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  EditorState,
  Editor,
  Modifier,
  SelectionState,
  DraftHandleValue,
} from 'draft-js';
import classNames from 'classnames';

import { useControllable, useVisibilityControl } from '@/hooks';
import { Option } from '@/types';
import { DomUtils } from '@/utils';

import { Dropdown } from '../../Dropdown';

type DecoratorStrategyCallback = (start: number, end: number) => void;

const MentionTrigger = (props: any) => {
  return (
    <span className='mention-trigger' data-offset-key={props.offsetKey}>
      {props.children}
    </span>
  );
};

const Mention = (props: any) => {
  return (
    <span>
      <span
        className={classNames(
          'mention',
          'inline-block py-0.5 px-2 mx-1 text-white bg-secondary rounded-full text-medium-sm'
        )}
        data-offset-key={props.offsetKey}
      >
        {props.children}
      </span>
    </span>
  );
};

const getCurrentBlock = (editorState: EditorState) => {
  if (editorState.getSelection) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  }
};

const findEntityRanges = (type: string, contentBlock: ContentBlock, contentState: ContentState) => {
  const ranges: [number, number][] = [];

  contentBlock.findEntityRanges(
    character => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === type;
    },
    (start, end) => ranges.push([start, end])
  );

  return ranges;
};

const newEntityLocationStrategy = (type: string) => {
  const findEntitiesOfType = (
    contentBlock: ContentBlock,
    callback: DecoratorStrategyCallback,
    contentState: ContentState
  ) => {
    const entityRanges = findEntityRanges(type, contentBlock, contentState);

    entityRanges.forEach(range => {
      callback(...range);
    });
  };
  return findEntitiesOfType;
};

const decorator = new CompositeDecorator([
  {
    strategy: newEntityLocationStrategy('MENTION_TRIGGER'),
    component: MentionTrigger,
  },
  {
    strategy: newEntityLocationStrategy('MENTION'),
    component: Mention,
  },
]);

type replaceTextParams = {
  editorState: EditorState;
  entityType?: string;
  start?: number;
  end?: number;
  newText: string;
  data?: any;
  mutability?: 'MUTABLE' | 'IMMUTABLE';
};

const replaceText = (params: replaceTextParams) => {
  const {
    editorState,
    entityType,
    start: startParam,
    end: endParam,
    newText,
    mutability,
    data,
  } = params;

  const start = startParam ?? editorState.getSelection().getStartOffset();
  const end = endParam ?? editorState.getSelection().getEndOffset();

  const currentBlock = getCurrentBlock(editorState);
  if (!currentBlock) {
    return editorState;
  }
  const blockKey = currentBlock.getKey();

  const isWithEntity = entityType && mutability;

  const contentState = editorState.getCurrentContent();
  const modifiedContentState = isWithEntity
    ? contentState.createEntity(entityType, mutability)
    : contentState;
  const entityKey = isWithEntity ? modifiedContentState.getLastCreatedEntityKey() : undefined;

  const contentStateWithReplacedText = Modifier.replaceText(
    modifiedContentState,
    new SelectionState({
      anchorKey: blockKey,
      anchorOffset: start,
      focusKey: blockKey,
      focusOffset: end,
      isBackward: false,
      hasFocus: true,
    }),
    newText,
    data,
    entityKey
  );

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithReplacedText,
    selection: new SelectionState({
      anchorKey: blockKey,
      anchorOffset: start + newText.length,
      focusKey: blockKey,
      focusOffset: start + newText.length,
      isBackward: false,
      hasFocus: true,
    }),
  });

  return newEditorState;
};

export type Ref = {
  insertMention: (option: Option<string, string>) => void;
  insertText: (text: string) => void;
};

export type Props = {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  placeholder?: string;
  ref?: Ref;
  singleLine?: boolean;
  mentionOptions?: Option<string, string>[];
};

export const emptyValue = EditorState.createEmpty(decorator);

export const RichTextEditor = React.forwardRef(
  ({ mentionOptions = [], singleLine, value, onChange, placeholder }: Props, ref) => {
    const [editorState, setEditorState] = useControllable<EditorState>({
      value,
      onChange,
      defaultValue: emptyValue,
    }) as [EditorState, (editorState: EditorState) => void];
    const [triggerNode, setTriggerNode] = React.useState<any>(null);
    const [mentionQuery, setMentionQuery] = React.useState('');
    const editorRef = React.useRef<any>(null);

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

    React.useImperativeHandle(ref, () => ({ insertMention, insertText }));

    const applyMentionTriggerEntity = React.useCallback((editorState: EditorState) => {
      const currentBlock = getCurrentBlock(editorState);
      if (!currentBlock) return editorState;

      const mentionEntityRanges = findEntityRanges(
        'MENTION',
        currentBlock,
        editorState.getCurrentContent()
      );

      const anchorOffset = editorState.getSelection().getAnchorOffset();

      const isAnchorOnMention = mentionEntityRanges.some(
        range => range[0] < anchorOffset && range[1] >= anchorOffset
      );

      if (isAnchorOnMention) return editorState;

      const textUntilAnchor = currentBlock.getText().slice(0, anchorOffset);
      const lastAtCharacter = textUntilAnchor.lastIndexOf('@');

      const isMentionBetweenAtAndAnchor = mentionEntityRanges.some(
        range => lastAtCharacter < range[0] && anchorOffset >= range[1]
      );

      if (lastAtCharacter === -1 || isMentionBetweenAtAndAnchor) return editorState;

      const mentionTriggerContent = textUntilAnchor.slice(lastAtCharacter, anchorOffset);

      return replaceText({
        editorState,
        entityType: 'MENTION_TRIGGER',
        mutability: 'MUTABLE',
        start: lastAtCharacter,
        end: anchorOffset,
        newText: mentionTriggerContent,
      });
    }, []);

    const handleChange = (newEditorState: EditorState) => {
      const transformedEditorState = applyMentionTriggerEntity(newEditorState);
      setEditorState(transformedEditorState);
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

    const handleDropdownSelect = (selectedValue: string) => {
      const selectedOption = mentionOptions.find(({ value }) => value === selectedValue)!;

      const { start } = getMentionTriggerData(editorState);

      const newEditorState = replaceText({
        editorState,
        entityType: 'MENTION',
        start,
        end: editorState.getSelection().getAnchorOffset(),
        newText: selectedOption.label,
        mutability: 'IMMUTABLE',
        data: selectedOption,
      });

      setEditorState(newEditorState);
    };

    const dropdownControl = useVisibilityControl();

    const closeMentionSuggestions = React.useCallback(() => {
      setTriggerNode(null);
      setMentionQuery('');
      dropdownControl.close();
    }, [dropdownControl]);

    const checkIfShouldRenderSuggestions = React.useCallback(() => {
      const focusNode = window.getSelection()?.focusNode;

      if (!focusNode) return;

      let mentionTrigger: Element | undefined = undefined;
      if (
        focusNode.parentElement?.parentElement?.parentElement?.classList.contains('mention-trigger')
      ) {
        // case the currently focused node is itself a mention trigger
        mentionTrigger = focusNode.parentElement.parentElement.parentElement;
      } else if (
        // case it focus on the next element which is a plain text, we take the previous trigger node if any
        focusNode.parentElement?.parentElement?.previousElementSibling?.classList.contains(
          'mention-trigger'
        )
      ) {
        mentionTrigger = focusNode.parentElement.parentElement.previousElementSibling;
      } else if (
        // case it focus on the next element which is a mention we take the previous trigger node if any
        focusNode.parentElement?.parentElement?.parentElement?.parentElement?.previousElementSibling?.classList.contains(
          'mention-trigger'
        )
      ) {
        mentionTrigger =
          focusNode.parentElement.parentElement.parentElement.parentElement.previousElementSibling;
      }

      if (!mentionTrigger) {
        closeMentionSuggestions();
        return;
      }

      setTriggerNode(mentionTrigger);
      const { content } = getMentionTriggerData(editorState);
      setMentionQuery(content.slice(1));
      dropdownControl.open();
    }, [closeMentionSuggestions, dropdownControl, editorState]);

    React.useEffect(() => {
      checkIfShouldRenderSuggestions();
    }, [checkIfShouldRenderSuggestions, editorState]);

    const handleReturn = (): DraftHandleValue => {
      if (dropdownControl.visible || singleLine) {
        return 'handled';
      }

      return 'not-handled';
    };

    const filteredMentionOptions = mentionOptions.filter(({ label }) =>
      label.toLocaleLowerCase().includes(mentionQuery.toLocaleLowerCase())
    );

    if (DomUtils.isServer()) return null;

    return (
      <div
        onClick={() => editorRef.current?.focus()}
        className={classNames(
          'rich-text-editor',
          'w-full p-2',
          'bg-white',
          singleLine ? 'w-[480px] h-10 mr-2 mb-1' : 'min-h-[100px]'
        )}
      >
        <Editor
          placeholder={placeholder}
          ref={editorRef}
          editorState={editorState}
          onChange={handleChange}
          handleReturn={handleReturn}
          onEscape={closeMentionSuggestions}
        />
        <Dropdown
          closeOnClickOutside={false}
          trigger={triggerNode!}
          control={dropdownControl}
          placement='right-start'
          options={filteredMentionOptions}
          onSelect={handleDropdownSelect}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';
