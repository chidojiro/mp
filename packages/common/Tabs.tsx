import React from 'react';
import classNames from 'classnames';

import { ClassName } from './types';
import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '@/headless';

export type Tab = {
  value?: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type TabsProps = HeadlessTabsProps &
  ClassName & {
    items: Tab[];
  };

// eslint-disable-next-line no-empty-pattern
export const Tabs = ({ value, onChange, items, className }: TabsProps) => {
  return (
    <HeadlessTabs value={value} onChange={onChange}>
      <div className={className}>
        <div className='hidden h-full sm:block'>
          <div className='border-b border-gray-200'>
            <nav className='flex items-center w-full -mb-px' aria-label='Tabs'>
              {items.map((tab, idx) => (
                <HeadlessTabs.Item key={tab.value ?? idx} content={tab.content} value={tab.value}>
                  {({ isActive, onClick }) => (
                    <button
                      onClick={onClick}
                      className={classNames(
                        isActive
                          ? 'font-bold border-secondary text-secondary'
                          : 'border-transparent text-gray-800',
                        'whitespace-nowrap py-4 px-1 border-b-[3px] font-medium text-sm flex-1',
                        'hover:border-secondary hover:text-secondary transition-all'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {tab.label}
                    </button>
                  )}
                </HeadlessTabs.Item>
              ))}
            </nav>
          </div>
          <div className='py-2'>
            <HeadlessTabs.Content />
          </div>
        </div>
      </div>
    </HeadlessTabs>
  );
};
