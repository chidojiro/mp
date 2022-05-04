import React from 'react';
import classNames from 'classnames';

import { useControllable, useStateToggle } from '@/hooks';

import { NumberInput } from './Number';
import { InputProps } from './types';

export const Input = React.forwardRef(
  (
    {
      label,
      className,
      error,
      type = 'text',
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
    }: InputProps,
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
      const inputClassName = classNames(
        'mp-input__native',
        'h-full w-full m-0 px-4 py-2 bg-transparent text-medium',
        'outline-none border-none'
      );

      if (type === 'number') {
        return (
          <NumberInput
            ref={ref}
            className={inputClassName}
            {...props}
            value={value}
            onChange={setValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeydown}
          />
        );
      }

      return (
        <input
          ref={inputRef}
          className={inputClassName}
          type={type}
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

    const isHidden = type === 'hidden';

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
        )}
      >
        {!!label && <label htmlFor={name}>{label}</label>}
        <div className={classNames('flex relative')}>
          {addonBefore && (
            <div
              className={classNames(
                'flex items-center px-2.5 flex-shrink-0 border-0 !border-r',
                borderClassNames
              )}
            >
              {addonBefore}
            </div>
          )}
          <div className='flex items-center flex-1'>
            {!!innerLeft && (
              <div className={classNames('flex items-center h-full px-4 z-1 flex-shrink-0')}>
                {innerLeft}
              </div>
            )}
            {renderInput()}
            {!!innerRight && (
              <div className={classNames('flex items-center flex-shrink-0 h-full px-4 z-1')}>
                {innerRight}
              </div>
            )}
          </div>
          {addonAfter && (
            <div
              className={classNames(
                'flex items-center px-4 flex-shrink-0 border-0 !border-l',
                borderClassNames
              )}
            >
              {addonAfter}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
