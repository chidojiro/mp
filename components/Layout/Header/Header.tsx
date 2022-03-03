import classNames from 'classnames';
import Link from 'next/link';

export const Header = () => {
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
        <img src='/images/GMP_givery.png' alt='' className='w-25 h-7' />
        <img src='/images/mp.png' alt='' className='h-7' />
      </div>
      <Link href='/account' passHref>
        <a className='font-semibold text-medium'>demo@gmail.com</a>
      </Link>
    </div>
  );
};
