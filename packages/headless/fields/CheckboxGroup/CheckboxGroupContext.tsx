import React from 'react';
import { noop } from 'lodash-es';

import { Children } from '../../types';

export type Props = Children & {
  onChange?: (value: string[]) => void;
  value?: string[];
  defaultValue?: string[];
  error?: boolean;
};

export type ChangeHandler = (value: string, isChecked: boolean) => void;

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
