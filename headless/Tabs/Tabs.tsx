import React from 'react';

import { noop } from 'lodash-es';

import { useControllable } from 'hooks';
import { Children } from 'types';

import { Content } from './Content';
import { Item } from './Item';

type Value = number | string;

export type Props<T extends Value = Value> = Children & {
  value?: T;
  onChange?: (value: T) => void;
};

type TabsProvider<T> = {
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

export const Tabs = <T extends Value>({ value: valueProp, onChange, children }: Props<T>) => {
  const [value, setValue] = useControllable({ value: valueProp, onChange, defaultValue: 0 as T });
  const [content, setContent] = React.useState<React.ReactNode>();
  const tabsCountRef = React.useRef(-1);

  const increaseTabsCount = React.useCallback(() => {
    tabsCountRef.current = tabsCountRef.current + 1;

    return tabsCountRef.current;
  }, []);

  const providerValue: TabsProvider<T> = React.useMemo(
    () => ({
      value,
      handleChange: setValue,
      content,
      setContent,
      tabsCount: tabsCountRef.current,
      increaseTabsCount,
    }),
    [content, increaseTabsCount, setValue, value]
  );

  return <TabsContext.Provider value={providerValue}>{children}</TabsContext.Provider>;
};

Tabs.Item = Item;
Tabs.Content = Content;
