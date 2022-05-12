import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { Accordion } from '@/components/common/Accordion';
import { Icon, IconName } from '@/components/common/Icon';
import { useVisibilityControl } from '@/hooks/useVisibilityControl';

export type NavItemData = {
  path?: string;
  label: string;
  children?: NavItemData[];
  matches?: string[];
  icon?: IconName;
};
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

  const anchorClasses = classNames(
    'flex text-medium items-center py-3 pl-3 hover:bg-dark-gray transition-all',
    {
      'bg-dark-gray': isMatched(data),
    }
  );
  const iconClasses = classNames('text-primary my-1', {
    'mr-2': showLabel,
  });
  if (path) {
    return (
      <Link passHref href={path ?? '#'}>
        <a className={anchorClasses} title={label}>
          <Icon name={icon} className={iconClasses} size={20} />
          {showLabel && label}
        </a>
      </Link>
    );
  }

  return (
    <Accordion control={accordionControl}>
      <Accordion.Title>
        <div className={anchorClasses}>
          <Icon name={icon} size={22} className={iconClasses} />
          {showLabel && label}
          {showLabel && navChildren && (
            <Icon
              name={accordionControl.visible ? 'chevron-up' : 'chevron-down'}
              className='ml-auto text-gray-500 mr-2'
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
