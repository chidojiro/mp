import { useControllable } from '@/hooks';
import React from 'react';
import { Props as InputProps } from '../Input';

type Props = Omit<InputProps, 'ref'>;

export const NumberInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      defaultValue,
      name,
      onBlur,
      min,
      max,
      allowNegative = false,
      value: valueProp,
      onChange,
      ...restProps
    },
    ref
  ) => {
    const [value, setValue] = useControllable({
      value: valueProp?.toString(),
      onChange,
      defaultValue: defaultValue?.toString(),
    });

    const displayValue = (val: string) => {
      if (allowNegative && val === '-') {
        return '-0';
      }

      if (Number.isNaN(+val)) {
        return value;
      }

      const absVal = Math.abs(+val).toString();

      if (allowNegative && val.startsWith('-')) {
        return `-${absVal}`;
      }
      return absVal;
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
      const _value = event.target.value.trim();
      let newValue = _value ? displayValue(_value) : '';

      if (min !== undefined && +newValue < +min) {
        newValue = min.toString();
      }

      if (max !== undefined && +newValue > +max) {
        newValue = max.toString();
      }

      setValue?.(newValue);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = event => {
      const displayValue = event.target.value;

      event.target.value = displayValue;

      onBlur?.(event);
    };

    return (
      <input
        ref={ref}
        className={className}
        type='text'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        {...restProps}
      />
    );
  }
);

NumberInput.displayName = 'NumberInput';
