import { useControllable, useVisibilityControl } from '@/hooks';
import { ClassName } from '@/types';
import classNames from 'classnames';
import React from 'react';
import style from './Mentions.module.css';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

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
};

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
    }: Props,
    ref: any
  ) => {
    const [value, setValue] = useControllable({ value: valueProp, onChange });
    const composingControl = useVisibilityControl();
    const internalRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current);

    const handleKeydown: React.KeyboardEventHandler<HTMLDivElement> = e => {
      if (!composingControl.visible && e.code === 'Enter')
        document.execCommand('insertHTML', false, '<br>');
    };

    return (
      <div className={classNames('mp-mentions', className, style['mp-mentions'])}>
        {!!label && (
          <label htmlFor={name} className='block mb-1 text-gray-5'>
            {label}
          </label>
        )}
        <ContentEditable
          data-ph={placeholder}
          className={classNames(
            'w-full p-2',
            'bg-white',
            'border border-solid outline-none rounded',
            error ? 'border-danger' : 'border-input',
            singleLine ? 'w-[480px] h-10 mr-2 mb-1' : 'min-h-[100px]'
          )}
          innerRef={internalRef}
          html={value || ''}
          onChange={(event: ContentEditableEvent) => {
            setValue(event.target.value);
          }}
          spellCheck={false}
          onCompositionStart={composingControl.open}
          onCompositionEnd={composingControl.close}
          onKeyDown={handleKeydown}
        />
      </div>
    );
  }
);

Mentions.displayName = 'Mentions';
