import React from 'react';
import { noop } from 'lodash-es';

import { Children } from '../../types';

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
