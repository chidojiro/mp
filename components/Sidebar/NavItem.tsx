import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Accordion } from '@/components/common/Accordion';
import { Icon } from '@/components/common/Icon';
import { useVisibilityControl } from '@/hooks/useVisibilityControl';

import { NavItemData } from './NavItem.types';

type Props = { data: NavItemData; showLabel: boolean };

export const NavItem = ({ data, showLabel = true }: Props) => {
  const { path, label, children: navChildren = [], icon = 'group' } = data;

  const router = useRouter();

  const isMatched = (item: NavItemData) => {
    return item.matches?.includes(router.pathname) || item.path === router.pathname;
  };

  const accordionControl = useVisibilityControl({
    defaultVisible: navChildren.some(item => isMatched(item)),
  });

  if (path)
    return (
      <Link passHref href={path}>
        <a
          className={classNames('flex text-medium items-center py-3  px-5 hover:bg-dark-gray', {
            'bg-dark-gray': isMatched(data),
          })}
          title={label}
        >
          <Icon name={icon} className='w-4 h-4 mr-2 text-primary my-1' size={22} />
          {showLabel && label}
        </a>
      </Link>
    );

  return (
    <Accordion control={accordionControl}>
      <Accordion.Title>
        <div
          className={classNames({
            'cursor-pointer flex text-medium items-center py-3 px-5 hover:bg-dark-gray': true,
          })}
        >
          <Icon name={icon} size={16} className='mr-2 text-primary my-1' />
          {showLabel && label}
          {showLabel && navChildren && (
            <Icon
              name={accordionControl.visible ? 'chevron-up' : 'chevron-down'}
              className='ml-auto text-gray-500'
              size={22}
            />
          )}
        </div>
      </Accordion.Title>
      <Accordion.Content>
        {navChildren.map(item => (
          <Link passHref href={item.path || ''} key={item.label}>
            <a
              className={classNames(
                'block text-medium items-center pl-12 pr-6 py-2.5 hover:bg-dark-gray hover:whitespace-normal truncate',
                {
                  'bg-dark-gray': isMatched(item),
                }
              )}
              title={item.label}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </Accordion.Content>
    </Accordion>
  );
};
