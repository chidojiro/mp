import classNames from 'classnames';
import React from 'react';
import { useControllable } from '../useControllable';
import { InputProps } from './types';
import { NumberUtils } from '../utils';
import { useVisibilityControl } from '../useVisibilityControl';

type Props = Omit<InputProps, 'ref'>;

const allowNegativePattern = /^\-?[0-9]+$/;
const disallowNegativePattern = /^[0-9]*$/;

export const NumberInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      defaultValue,
      name,
      min,
      max,
      allowNegative = false,
      value: valueProp,
      onChange,
      pad,
      onFocus,
      onBlur,
      ...restProps
    },
    ref
  ) => {
    const [value, setValue] = useControllable({
      value: valueProp,
      onChange,
      defaultValue,
    });

    const focusControl = useVisibilityControl();
    const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      focusControl.open();
      onFocus?.(e);
    };
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      focusControl.close();
      onBlur?.(e);
    };

    const pattern = allowNegative ? allowNegativePattern : disallowNegativePattern;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      if (!pattern.test(e.target.value)) {
        e.target.value = value;
        setValue(e);
        return;
      }

      let newValue = (+e.target.value).toString();
      if (!newValue) {
        newValue = '0';
      } else if (newValue === '-') {
        newValue = '-' + NumberUtils.pad(0, pad);
      } else if (min !== undefined && +newValue < +min) {
        newValue = min.toString();
      } else if (max !== undefined && +newValue > +max) {
        newValue = max.toString();
      }

      e.target.value = newValue;
      setValue(e);
    };

    const _value = focusControl.visible || !pad ? value : NumberUtils.pad(value, pad);

    return (
      <input
        ref={ref}
        className={classNames('mp-input__native--number', className)}
        type='text'
        value={_value?.toString() ?? ''}
        onChange={handleChange}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';
