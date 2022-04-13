import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Accordion } from '@/components/common/Accordion';
import { Icon } from '@/components/common/Icon';
import { useVisibilityControl } from '@/hooks/useVisibilityControl';

import { NavItemData } from './NavItem.types';

type Props = { data: NavItemData };

export const NavItem = ({ data }: Props) => {
  const { path, label, children = [], icon } = data;

  const router = useRouter();

  const isMatched = (item: NavItemData) => {
    return item.matches?.includes(router.pathname) || item.path === router.pathname;
  };

  const accordionControl = useVisibilityControl(children.some(item => isMatched(item)));

  if (path)
    return (
      <Link passHref href={path}>
        <a
          className={classNames('flex text-medium items-center px-6 py-2.5 hover:bg-dark-gray', {
            'bg-dark-gray': isMatched(data),
          })}
        >
          <Icon name={icon || 'group'} className='w-4 h-4 mr-2 text-primary' />
          {label}
        </a>
      </Link>
    );

  return (
    <Accordion control={accordionControl}>
      <Accordion.Title>
        <div
          className={classNames(
            'cursor-pointer flex text-medium items-center px-6 py-2.5 hover:bg-dark-gray'
          )}
        >
          <Icon name={icon || 'group'} size={16} className='mr-2 text-primary' />
          {label}
        </div>
      </Accordion.Title>
      <Accordion.Content>
        {children.map(item => (
          <Link passHref href={item.path || ''} key={item.label}>
            <a
              className={classNames(
                'block text-medium items-center pl-12 pr-6 py-2.5 hover:bg-dark-gray truncate',
                {
                  'bg-dark-gray': isMatched(item),
                }
              )}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </Accordion.Content>
    </Accordion>
  );
};
