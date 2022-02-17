import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '@/headless';
import classNames from 'classnames';

export type Menu = {
  id: string;
  name?: string;
  content?: React.ReactNode;
};

type Props = HeadlessTabsProps & {
  className?: string;
  items?: Menu[];
};

export const SideMenu = ({ className, onChange, items = [] }: Props) => {
  return (
    <HeadlessTabs onChange={onChange}>
      <div className='flex w-full'>
        <div className={classNames('mr-7 w-[200px]', className)}>
          <nav className='flex flex-col items-center w-full -mb-px'>
            {items.map((item, idx) => (
              <HeadlessTabs.Item key={item.id ?? idx} content={item.content} value={item.id}>
                {({ isActive, onClick }) => (
                  <div
                    key={item.id}
                    onClick={onClick}
                    className={classNames(
                      'text-ellipsis overflow-hidden whitespace-nowrap text-gray-dark w-full rounded-full cursor-pointer text-medium px-[18px] mb-2.5 py-[6px]',
                      {
                        'bg-gray-light border border-dark-gray rounded-full': isActive,
                      }
                    )}>
                    {item.name}
                  </div>
                )}
              </HeadlessTabs.Item>
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
