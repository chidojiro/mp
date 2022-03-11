import { noop } from 'lodash';
import React from 'react';
import { useControllable } from 'hooks';
import { Children } from 'types';
import { Option } from './Option';

export type Props = Children & {
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  error?: boolean;
};

export type RadioGroupProvider = {
  value?: string;
  handleChange: (value: string) => void;
  groupProps: Props;
};

export const RadioGroupContext = React.createContext<RadioGroupProvider>({
  value: undefined,
  handleChange: noop,
  groupProps: {},
});

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
