import React from 'react';

import { useControllable } from '@/hooks';

import { Option } from './Option';
import { ChangeHandler, CheckboxGroupContext, Props } from './CheckboxGroupContext';

export const CheckboxGroup = (props: Props) => {
  const { onChange: onChangeProp, defaultValue = [], value: valueProp, children, error } = props;

  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const handleChange: ChangeHandler = React.useCallback(
    (targetValue, isChecked) => {
      let newValue;
      if (isChecked) {
        newValue = [...value, targetValue];
      } else {
        newValue = value.filter((value: any) => value !== targetValue);
      }

      setValue(newValue);
    },
    [setValue, value]
  );

  const providerValue = React.useMemo(
    () => ({ handleChange, value, groupProps: props }),
    [props, handleChange, value]
  );

  return (
    <CheckboxGroupContext.Provider value={providerValue}>{children}</CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.Option = Option;
