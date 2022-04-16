import classNames from 'classnames';

import { Tabs as HeadlessTabs } from '@/headless';
import { useVisibilityControl } from '@/hooks';

import { Accordion } from '../Accordion';

export type SideMenuItem = {
  value: string;
  label?: React.ReactNode;
  content?: React.ReactNode;
  children?: SideMenuItem[];
  onClick?: () => void;
};

type Props = {
  data: SideMenuItem;
  isOpenAccordion?: boolean;
};

export const Item = ({ isOpenAccordion, data }: Props) => {
  const { label, value, content, children: items, onClick: onClickItem } = data;

  const accordionControl = useVisibilityControl(isOpenAccordion);
  if (content) {
    return (
      <HeadlessTabs.Item content={content} value={value}>
        {({ isActive, onClick }) => (
          <div
            key={value}
            onClick={() => {
              onClick();
              onClickItem?.();
            }}
            className={classNames(
              'text-ellipsis overflow-hidden whitespace-nowrap px-[18px] py-1.5 border border-white hover:border-dark-gray items-center hover:bg-gray-light text-gray-dark w-full rounded-full cursor-pointer font-bold text-medium mb-2.5',
              {
                'bg-gray-light border border-dark-gray ': isActive,
              }
            )}
          >
            {label}
          </div>
        )}
      </HeadlessTabs.Item>
    );
  }
  return (
    <Accordion control={accordionControl}>
      <Accordion.Title>
        <div
          className={classNames(
            'cursor-pointer rounded-full flex text-medium font-bold text-gray-dark border border-white hover:border-dark-gray items-center px-[18px] py-1.5 hover:bg-gray-light mb-2.5'
          )}
        >
          {label}
        </div>
      </Accordion.Title>
      <Accordion.Content>
        {items?.map((item, subId) => (
          <HeadlessTabs.Item key={item.value ?? subId} content={item.content} value={item.value}>
            {({ isActive, onClick }) => (
              <div
                key={item.value}
                onClick={() => {
                  onClick();
                  item.onClick?.();
                }}
                className={classNames(
                  'text-ellipsis border border-white overflow-hidden whitespace-nowrap text-gray-dark w-full rounded-full cursor-pointer text-medium px-[18px] mb-2.5 py-1.5 hover:border-dark-gray items-center hover:bg-gray-light',
                  {
                    'bg-gray-light border border-dark-gray rounded-full': isActive,
                  }
                )}
              >
                {item.label}
              </div>
            )}
          </HeadlessTabs.Item>
        ))}
      </Accordion.Content>
    </Accordion>
  );
};
