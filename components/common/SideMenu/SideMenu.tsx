import { Tabs as HeadlessTabs, TabsProps as HeadlessTabsProps } from '@/headless';
import { ClassName } from '@/types';
import { UriUtils } from '@/utils';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type Item = {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
};

export type Props = HeadlessTabsProps &
  ClassName & {
    items: Item[];
  };

export const SideMenu = ({ value, className, onChange, items }: Props) => {
  const router = useRouter();

  return (
    <HeadlessTabs value={value} onChange={onChange}>
      <div className={classNames('flex w-full', className)}>
        <div className={classNames('mr-7 w-[220px]')}>
          <nav className='flex flex-col items-center w-full -mb-px'>
            {items.map((item, idx) => (
              <HeadlessTabs.Item key={item.value ?? idx} content={item.content} value={item.value}>
                {({ isActive, onClick }) => (
                  <Link passHref href={UriUtils.replace(router.pathname, [item.value])}>
                    <a
                      key={item.value}
                      onClick={onClick}
                      className={classNames(
                        'text-ellipsis overflow-hidden whitespace-nowrap text-gray-dark w-full rounded-full cursor-pointer text-medium px-[18px] mb-2.5 py-[6px]',
                        {
                          'bg-gray-light border border-dark-gray rounded-full': isActive,
                        }
                      )}>
                      {item.label}
                    </a>
                  </Link>
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
