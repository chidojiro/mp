import classNames from 'classnames';
import Link from 'next/link';

import { useProfile } from '@/hooks/api/useProfile';

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
      <Link href='/account' passHref>
        <a className='font-semibold text-medium'>{data?.email}</a>
      </Link>
    </div>
  );
};
