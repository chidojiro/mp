import React from 'react';
import classNames from 'classnames';

import {
  RadioGroup as HeadlessRadioGroup,
  RadioGroupOptionProps,
  RadioGroupProps as HeadlessRadioGroupProps,
} from '@/headless';

import { Radio, RadioProps } from './Radio';

// eslint-disable-next-line @typescript-eslint/ban-types
type OptionProps = RadioGroupOptionProps & RadioProps & {};

const Option = ({ children, value, shouldChange, className, ...restProps }: OptionProps) => {
  if (children)
    return (
      <HeadlessRadioGroup.Option value={value} shouldChange={shouldChange}>
        {children}
      </HeadlessRadioGroup.Option>
    );

  return (
    <HeadlessRadioGroup.Option value={value} shouldChange={shouldChange}>
      {({ handleChange, isChecked, value, error }) => (
        <Radio
          checked={isChecked}
          value={value}
          onChange={handleChange}
          className={classNames('mp-radio-group-option', 'text-medium', className)}
          {...restProps}
        />
      )}
    </HeadlessRadioGroup.Option>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type RadioGroupProps = HeadlessRadioGroupProps & { name?: string };

// eslint-disable-next-line no-empty-pattern
const RadioGroup_ = React.forwardRef<any, RadioGroupProps>(
  ({ children, name, ...restProps }, ref) => {
    return (
      <HeadlessRadioGroup {...restProps}>
        <input className='minimized' ref={ref} name={name} />
        {children}
      </HeadlessRadioGroup>
    );
  }
);

RadioGroup_.displayName = 'RadioGroup';
(RadioGroup_ as any).Option = Option;

export const RadioGroup = RadioGroup_ as typeof RadioGroup_ & { Option: typeof Option };
