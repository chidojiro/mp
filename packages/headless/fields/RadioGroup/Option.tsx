import React, { ChangeEvent } from 'react';

import { RadioGroupContext, RadioGroupProvider } from './RadioGroupContext';

export type RenderPropState = {
  value: string;
  isChecked: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
};

export type OptionProps = {
  value: string;
  shouldChange?: (
    e: ChangeEvent<HTMLInputElement>,
    checkboxGroupValue?: string
  ) => boolean | Promise<boolean>;
  children?: (state: RenderPropState) => React.ReactNode;
};

export const Option = (
  { value, shouldChange: shouldChangeProp, children }: OptionProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const groupProviderValue = React.useContext<RadioGroupProvider>(RadioGroupContext);

  const isChecked = groupProviderValue.value === value;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async e => {
    const value = e.target.value;

    const shouldChange = (await shouldChangeProp?.(e, groupProviderValue.value)) ?? true;

    if (shouldChange) {
      groupProviderValue?.handleChange(value);
    }
  };

  return (
    <>
      {children?.({ value, isChecked, handleChange, error: !!groupProviderValue.groupProps.error })}
    </>
  );
};
