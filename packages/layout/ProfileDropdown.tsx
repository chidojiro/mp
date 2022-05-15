import { Fragment } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { useAuth } from '@/auth/useAuth';
import { Menu, Transition } from '@headlessui/react';

export type ProfileDropdownProps = {
  text: string;
};
export const ProfileDropdown = ({ text }: ProfileDropdownProps) => {
  const { t } = useTranslation('common');
  const auth = useAuth();
  const handleLogout = () => {
    auth.logout();
  };
  const userNavigation = [
    { name: 'accountSettings', href: '/account' },
    { name: 'logout', href: '/', onClick: handleLogout },
  ];
  return (
    <Menu as='div' className='ml-3 relative'>
      <div className='border p-2 rounded-md border-gray-300'>
        <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full'>
          <span className='sr-only'>Open user menu</span>
          <a className='font-bold text-medium'>{text}</a>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          {userNavigation.map(item => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  {t(item.name)}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
