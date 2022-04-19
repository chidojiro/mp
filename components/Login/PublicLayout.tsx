import { useTranslation } from 'next-i18next';

import { Children } from '@/types';

type Props = Children;
export const PublicLayout = ({ children }: Props) => {
  const { t } = useTranslation('login');
  return (
    <div className='grid h-screen grid-cols-2 overflow-hidden'>
      <div className='relative flex items-center justify-center'>
        <img src='/images/login2.svg' alt='' className='absolute top-[-250px] left-[-85px]' />
        <img src='/images/login1.svg' alt='' className='absolute bottom-[-155px] left-[-136px]' />
        <img src='/images/login3.svg' alt='' className='absolute bottom-[-155px] right-[-175px]' />
        <div className='flex flex-col items-start font-semibold px-28 text-gray-dark'>
          <div>{t('logoTitle')}</div>
          <img src='/images/synalio.svg' alt='' className='w-[440px] h-[100px] mt-2 mb-5' />
          <h3 className='font-semibold whitespace-pre-line'>{t('description')}</h3>
        </div>
      </div>
      <div className='z-10 flex items-center justify-center bg-gray-light'>{children}</div>
    </div>
  );
};
