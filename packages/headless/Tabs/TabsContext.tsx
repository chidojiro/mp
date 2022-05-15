import React from 'react';
import { noop } from 'lodash-es';

export type Value = number | string;

export type TabsProvider<T> = {
  handleChange: (value: T) => void;
  value?: T;
  content?: React.ReactNode;
  setContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  tabsCount: number;
  increaseTabsCount: () => number;
};

export const TabsContext = React.createContext<TabsProvider<any>>({
  value: undefined,
  handleChange: noop,
  content: undefined,
  setContent: noop,
  tabsCount: 0,
  increaseTabsCount: () => -1,
});
