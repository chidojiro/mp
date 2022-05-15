import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '@/headless';
import classNames from 'classnames';
import { Icon, IconName } from '../Icon';
import { ClassName } from '../types';
import { Item, SideMenuItem } from './Item';

export type SideMenuGroupItem = {
  icon: IconName;
  label: string;
  items: SideMenuItem[];
};

export type SideMenuProps = HeadlessTabsProps &
  ClassName & {
    groups: SideMenuGroupItem[];
  };

export const SideMenu = ({ value, className, onChange, groups }: SideMenuProps) => {
  const isOpenAccordion = (item: SideMenuItem, val: any) => {
    const _values = item.children?.map(_item => _item.value) || [];
    return _values.includes(val);
  };

  return (
    <HeadlessTabs value={value} onChange={onChange}>
      <div className={classNames('flex w-full', className)}>
        <div className={classNames('mr-7 w-[200px]')}>
          <nav className='flex flex-col items-center w-full -mb-px'>
            {groups.map((group, id) => (
              <div key={id} className='w-full'>
                {!!group.items.length && (
                  <>
                    <div className='flex items-center pb-1 border-b-2 border-dark-gray'>
                      <Icon name={group.icon} className='w-3.5 h-3.5' />
                      <span className='ml-1 font-bold text-medium text-input-focus'>
                        {group.label}
                      </span>
                    </div>
                    <div className='mt-2.5 mb-3'>
                      {group.items.map((item: SideMenuItem, idx: number) => (
                        <Item
                          data={item}
                          key={item.value ?? idx}
                          isOpenAccordion={isOpenAccordion(item, value)}
                        />
                      ))}
                    </div>
                  </>
                )}
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
