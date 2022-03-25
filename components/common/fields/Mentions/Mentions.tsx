import { useControllable, useVisibilityControl } from '@/hooks';
import { ClassName, Option } from '@/types';
import classNames from 'classnames';
import React from 'react';
import style from './Mentions.module.css';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { Dropdown } from '../../Dropdown';
import { MentionUtils } from '@/utils';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = ClassName & {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  label?: React.ReactNode;
  name?: string;
  error?: boolean;
  singleLine?: boolean;
  ref?: any;
  options?: Option[];
};

const mentionTriggerClassName = 'mention-trigger';
const alphabetAtCode = 50;
const japaneseAtCode = 229;

// eslint-disable-next-line no-empty-pattern
export const Mentions = React.forwardRef(
  (
    {
      value: valueProp,
      onChange,
      placeholder,
      label,
      className,
      name,
      error,
      singleLine = false,
      options = [],
    }: Props,
    ref: any
  ) => {
    const [value, setValue] = useControllable({ value: valueProp, onChange });
    const composingControl = useVisibilityControl();
    const internalRef = React.useRef<HTMLDivElement>(null);
    const dropdownControl = useVisibilityControl(true);
    const [mentionTriggerNode, setMentionTriggerNode] = React.useState<Element | null>(null);
    const [previousKeystroke, setPreviousKeystore] = React.useState<
      'ArrowLeft' | 'ArrowRight' | 'Backspace' | 'Delete' | null
    >(null);

    React.useImperativeHandle(ref, () => internalRef.current);

    const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = e => {
      if (['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].includes(e.key)) {
        setPreviousKeystore(e.key as any);
        return;
      }
      const containingNode = (window.getSelection() as any)?.baseNode.parentElement as Element;

      if (['Delete', 'Backspace'].includes(e.key)) {
        if (containingNode.tagName === 'SPAN' && containingNode.className === 'mention-item') {
          e.preventDefault();
          containingNode.remove();
        }

        return;
      }
      if ([alphabetAtCode].includes(e.keyCode)) {
        e.preventDefault();

        document.execCommand(
          'insertHTML',
          false,
          `<span class="${mentionTriggerClassName}">@</span>`
        );
      } else if (e.key === ' ') {
        e.preventDefault();

        // make sure next words are separated from mention span
        document.execCommand('insertHTML', false, '<span>&nbsp;</span>');
      }
    };

    const handleChange = (e: ContentEditableEvent) => {
      setValue(e.target.value);
    };

    const handleEditContentSelect: React.ReactEventHandler<HTMLDivElement> = e => {
      const containingNode = (window.getSelection() as any)?.baseNode.parentElement as Element;

      if (
        containingNode.tagName == 'SPAN' &&
        containingNode.className === mentionTriggerClassName
      ) {
        setMentionTriggerNode(containingNode);
        dropdownControl.open();
      } else {
        setMentionTriggerNode(null);
        dropdownControl.close();
      }
    };

    const handleDropdownSelect = (selectedValue: string) => {
      const foundOption = options.find(({ value }) => value === selectedValue);

      if (foundOption) {
        mentionTriggerNode?.remove();
        MentionUtils.insert(foundOption);
      }

      dropdownControl.close();
      setMentionTriggerNode(null);
    };

    return (
      <div className={classNames('mp-mentions', className, style['mp-mentions'])}>
        {!!label && (
          <label htmlFor={name} className='block mb-1 text-gray-5'>
            {label}
          </label>
        )}
        <Dropdown
          trigger={mentionTriggerNode as any}
          control={dropdownControl}
          placement='right-start'
          options={options}
          offset={[0, 8]}
          onSelect={handleDropdownSelect}
        />
        <ContentEditable
          data-ph={placeholder}
          className={classNames(
            'inline-block',
            'w-full p-2',
            'bg-white',
            'border border-solid outline-none rounded',
            error ? 'border-danger' : 'border-input',
            singleLine ? 'w-[480px] h-10 mr-2 mb-1' : 'min-h-[100px]'
          )}
          innerRef={internalRef}
          html={value || ''}
          onChange={handleChange}
          spellCheck={false}
          onCompositionStart={() => composingControl.open()}
          onCompositionEnd={() => composingControl.close()}
          onKeyDown={handleKeydown}
          onSelect={handleEditContentSelect}
        />
      </div>
    );
  }
);

Mentions.displayName = 'Mentions';
