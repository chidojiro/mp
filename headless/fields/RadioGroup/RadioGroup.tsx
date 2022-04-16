import React from 'react';

import { useControllable } from 'hooks';

import { Option } from './Option';
import { Props, RadioGroupContext } from './RadioGroupContext';

export const RadioGroup = (props: Props) => {
  const { value: valueProp, onChange: onChangeProp, defaultValue, children, error } = props;

  const [value, setValue] = useControllable({
    value: valueProp?.toString(),
    onChange: onChangeProp,
    defaultValue,
  });

  const handleChange = React.useCallback(
    (value: string) => {
      let _value: string | boolean = value;
      if (value === 'true') _value = true;
      if (value === 'false') _value = false;

      setValue?.(_value);
    },
    [setValue]
  );

  const providerValue = React.useMemo(
    () => ({ handleChange, value, groupProps: props }),
    [handleChange, props, value]
  );

  return <RadioGroupContext.Provider value={providerValue}>{children}</RadioGroupContext.Provider>;
};

RadioGroup.Option = Option;
