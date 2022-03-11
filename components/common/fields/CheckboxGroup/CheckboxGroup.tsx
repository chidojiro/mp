import {
  CheckboxGroup as HeadlessCheckboxGroup,
  CheckboxGroupOptionProps,
  CheckboxGroupProps as HeadlessCheckboxGroupProps,
} from '@/headless';
import React from 'react';
import { Checkbox, CheckboxProps } from '../Checkbox';

// eslint-disable-next-line @typescript-eslint/ban-types
type OptionProps = CheckboxGroupOptionProps & CheckboxProps & {};

const Option = ({ children, value, shouldChange, ...restProps }: OptionProps) => {
  if (children)
    return (
      <HeadlessCheckboxGroup.Option value={value} shouldChange={shouldChange}>
        {children}
      </HeadlessCheckboxGroup.Option>
    );

  return (
    <HeadlessCheckboxGroup.Option value={value} shouldChange={shouldChange}>
      {({ handleChange, isChecked, value, error }) => (
        <Checkbox
          checked={isChecked}
          value={value}
          onChange={handleChange}
          error={error}
          {...restProps}
        />
      )}
    </HeadlessCheckboxGroup.Option>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = HeadlessCheckboxGroupProps & {};

// eslint-disable-next-line no-empty-pattern
const CheckboxGroup_ = React.forwardRef<any, Props>(({ children, ...restProps }, ref) => {
  return (
    <HeadlessCheckboxGroup {...restProps}>
      {children}
      <input className='minimized' ref={ref} />
    </HeadlessCheckboxGroup>
  );
});

CheckboxGroup_.displayName = 'CheckboxGroup';
(CheckboxGroup_ as any).Option = Option;
export const CheckboxGroup = CheckboxGroup_ as typeof CheckboxGroup_ & { Option: typeof Option };
