import classNames from 'classnames';
import React from 'react';
import { useStateToggle, useControllable } from '@/hooks';
import { HTMLInputProps } from '@/types';

type BaseInputProps = Omit<HTMLInputProps, 'ref' | 'type'> & {
  ref?: React.Ref<HTMLInputElement>;
};

type InputType = 'email' | 'file' | 'hidden' | 'number' | 'password' | 'tel' | 'text' | 'time';

export type Props = BaseInputProps & {
  label?: string;
  error?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  innerLeft?: React.ReactNode;
  innerRight?: React.ReactNode;
  htmlType?: InputType;
  trimOnBlur?: boolean;
  onEnterPress?: () => void;
  pattern?: string;
};

export const Input = React.forwardRef(
  (
    {
      label,
      className,
      error,
      htmlType = 'text',
      addonAfter,
      addonBefore,
      innerLeft,
      innerRight,
      onFocus,
      onBlur,
      value: valueProp,
      onChange: onChangeProp,
      trimOnBlur = true,
      onEnterPress,
      onKeyDown,
      ...props
    }: Props,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [value, setValue] = useControllable({ value: valueProp, onChange: onChangeProp });

    const inputRef = React.useRef<HTMLInputElement>(null);

    const [isFocused, toggleFocus] = useStateToggle();

    const { name } = props;

    const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (props.pattern && !ev.target.checkValidity()) {
        ev.target.value = '';
      }
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      onFocus?.(e);
      toggleFocus();
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      e.persist();

      if (trimOnBlur) {
        e.target.value = e.target.value.trim();
        setValue(e);
      }

      onBlur?.(e);
      toggleFocus();
    };

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const renderInput = () => {
      const inputClassName = classNames('h-full w-full m-0 px-4 py-2 bg-transparent', 'outline-none border-none');

      return (
        <input
          ref={inputRef}
          className={inputClassName}
          type={htmlType}
          {...props}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeydown}
          value={value}
          onChange={setValue}
        />
      );
    };

    const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      onKeyDown?.(e);

      if (e.key === 'Enter') {
        onEnterPress?.();
      }
    };

    const isHidden = htmlType === 'hidden';

    const borderClassNames = classNames('border border-input border-solid', {
      'border-input-focus': isFocused,
      '!border-danger': error,
    });

    return (
      <div
        className={classNames(
          'mp-input',
          'w-full max-w-full relative overflow-hidden bg-white rounded',
          borderClassNames,
          {
            minimized: isHidden,
          },

          className
        )}>
        {!!label && <label htmlFor={name}>{label}</label>}
        <div className={classNames('w-full flex relative')}>
          {addonBefore && (
            <div className={classNames('flex items-center px-2.5 flex-shrink-0 border-0 !border-r', borderClassNames)}>
              {addonBefore}
            </div>
          )}
          <div className='flex items-center flex-1'>
            {!!innerLeft && (
              <div className={classNames('flex items-center h-full px-4 z-1 flex-shrink-0')}>{innerLeft}</div>
            )}
            {renderInput()}
            {!!innerRight && (
              <div className={classNames('flex items-center flex-shrink-0 h-full px-4 z-1')}>{innerRight}</div>
            )}
          </div>
          {addonAfter && (
            <div className={classNames('flex items-center px-4 flex-shrink-0 border-0 !border-l', borderClassNames)}>
              {addonAfter}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
