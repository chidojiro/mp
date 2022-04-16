import React from 'react';

import { useControllable } from '@/hooks';
import { Children } from '@/types';

import { Content } from './Content';
import { Item } from './Item';
import { Value, TabsContext, TabsProvider } from './TabsContext';

export type Props<T extends Value = Value> = Children & {
  value?: T;
  onChange?: (value: T) => void;
};

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
