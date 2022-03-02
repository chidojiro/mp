import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '@/headless';
import { ClassName } from '@/types';
import classNames from 'classnames';
import { Icon, IconName } from '../Icon';
import { SideMenuItem } from './SideMenuItem';

export type Item = {
  value: string;
  label?: React.ReactNode;
  content?: React.ReactNode;
  children?: Item[];
  onClick?: () => void;
};

export type GroupItem = {
  icon: IconName;
  label: string;
  items: Item[];
};

export type Props = HeadlessTabsProps &
  ClassName & {
    groups: GroupItem[];
  };

export const SideMenu = ({ value, className, onChange, groups }: Props) => {
  const isOpenAccordion = (item: Item, val: any) => {
    const _values = item.children?.map(_item => _item.value) || [];
    return _values.includes(val);
  };

  return (
    <HeadlessTabs value={value} onChange={onChange}>
      <div className={classNames('flex w-full', className)}>
        <div className={classNames('mr-7 w-[220px]')}>
          <nav className='flex flex-col items-center w-full -mb-px'>
            {groups.map((group, id) => (
              <div key={id} className='w-full'>
                <div className='flex items-center pb-1 border-b-2 border-dark-gray'>
                  <Icon name={group.icon} className='w-4' />
                  <span className='ml-1 font-bold text-medium text-input'>{group.label}</span>
                </div>
                <div className='mt-2.5 mb-3'>
                  {group.items.map((item: Item, idx: number) => (
                    <SideMenuItem
                      data={item}
                      key={item.value ?? idx}
                      isOpenAccordion={isOpenAccordion(item, value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
        <div className='flex-1 w-full'>
          <HeadlessTabs.Content />
        </div>
      </div>
    </HeadlessTabs>
  );
};
