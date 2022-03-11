import { ClassName } from '@/types';
import classNames from 'classnames';
import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '@/headless';

type Item = {
  label: React.ReactNode;
  value: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = HeadlessTabsProps<string> &
  ClassName & {
    items: Item[];
  };

// eslint-disable-next-line no-empty-pattern
export const SwitchButtons = ({ value, onChange, className, items }: Props) => {
  return (
    <HeadlessTabs value={value} onChange={onChange}>
      <div
        className={classNames(
          'mp-switch-buttons',
          'inline-flex items-center rounded-full overflow-hidden',
          'border border-white border-solid',
          className
        )}
      >
        {items.map((item, idx) => (
          <HeadlessTabs.Item key={item.value ?? idx} value={item.value}>
            {({ isActive, onClick }) => (
              <div
                onClick={onClick}
                key={value}
                className={classNames(
                  'w-20 h-8 cursor-pointer',
                  'flex items-center justify-center',
                  'border-r border-solid border-white last-of-type:border-r-0',
                  isActive ? 'bg-white text-primary' : 'text-white'
                )}
              >
                {item.label}
              </div>
            )}
          </HeadlessTabs.Item>
        ))}
      </div>
    </HeadlessTabs>
  );
};
