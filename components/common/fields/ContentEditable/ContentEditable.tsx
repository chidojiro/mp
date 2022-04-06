import React from 'react';

import classNames from 'classnames';
import BaseContentEditable, { ContentEditableEvent } from 'react-contenteditable';

import { useControllable, useVisibilityControl } from '@/hooks';
import { ClassName, Option } from '@/types';
import { ContentEditableUtils } from '@/utils';

import { Dropdown } from '../../Dropdown';
import style from './ContentEditable.module.css';

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
const japaneseAtCode = 229;

// eslint-disable-next-line no-empty-pattern
export const ContentEditable = React.forwardRef(
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
    const internalRef = React.useRef<HTMLDivElement>(null);
    const dropdownControl = useVisibilityControl();
    const [mentionTriggerNode, setMentionTriggerNode] = React.useState<Element | null>(null);

    const shouldUseMention = !!options.length;

    React.useImperativeHandle(ref, () => internalRef.current);

    const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = e => {
      if (!shouldUseMention) return;

      if (e.key === 'Enter' && mentionTriggerNode) {
        e.preventDefault();

        return;
      }
      if (e.key === '@' && e.keyCode !== japaneseAtCode) {
        e.preventDefault();

        document.execCommand(
          'insertHTML',
          false,
          `<span class="${mentionTriggerClassName}">@</span>`
        );
        return;
      }
    };

    const handleChange = (e: ContentEditableEvent) => {
      const value = e.target.value;

      setValue(value);
    };

    const handleEditContentSelect: React.ReactEventHandler<HTMLDivElement> = e => {
      const containingNode = (window.getSelection() as any)?.baseNode.parentElement as Element;

      if (window.getSelection()?.focusNode?.textContent?.startsWith('@')) {
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
        ContentEditableUtils.insert(foundOption);
      }

      dropdownControl.close();
      setMentionTriggerNode(null);
    };

    return (
      <div className={classNames('mp-content-editable', className, style['mp-content-editable'])}>
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
        <BaseContentEditable
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
          onKeyDown={handleKeydown}
          onSelect={handleEditContentSelect}
        />
      </div>
    );
  }
);

ContentEditable.displayName = 'ContentEditable';
