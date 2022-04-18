import classNames from 'classnames';

import { useProfile } from '@/hooks/api/useProfile';

import { ProfileDropdown } from './ProfileDropdown';

export const Header = () => {
  const { data } = useProfile();

  return (
    <div
      className={classNames(
        'h-12 px-10 bg-white',
        'flex items-center justify-between',
        'fixed top-0 left-0 w-full z-50',
        'border-b border-input'
      )}
    >
      <div className='flex items-center h-full'>
        <img src='/images/synalio_header.svg' alt='logo' className='h-6 w-[177px]' />
      </div>
      <ProfileDropdown text={data?.email} />
    </div>
  );
};
