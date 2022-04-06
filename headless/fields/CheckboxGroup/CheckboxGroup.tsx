import React from 'react';

import { noop } from 'lodash-es';

import { useControllable } from 'hooks';
import { Children } from 'types';

import { Option } from './Option';

export type Props = Children & {
  onChange?: (value: string[]) => void;
  value?: string[];
  defaultValue?: string[];
  error?: boolean;
};

type ChangeHandler = (value: string, isChecked: boolean) => void;

export type CheckboxGroupProvider = {
  value: string[];
  handleChange: ChangeHandler;
  groupProps: Props;
};

export const CheckboxGroupContext = React.createContext<CheckboxGroupProvider>({
  value: [],
  handleChange: noop,
  groupProps: {},
});

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
