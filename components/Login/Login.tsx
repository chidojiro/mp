import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { LoginForm } from './LoginForm';

export const Login = () => {
  const { t } = useTranslation('login');
  return (
    <div className='grid h-screen grid-cols-2 overflow-hidden'>
      <div className='relative flex items-center justify-center'>
        <img src='/images/login2.svg' alt='' className='absolute top-[-250px] left-[-85px]' />
        <img src='/images/login1.svg' alt='' className='absolute bottom-[-215px] left-[-136px]' />
        <img src='/images/login3.svg' alt='' className='absolute bottom-[-215px] right-[-136px]' />
        <div className='flex flex-col items-start px-28'>
          <img src='/images/GMP_givery.png' alt='' className='w-24 ml-1' />
          <img src='/images/logoMP.png' alt='' className='w-[475px]' />
          <div className='mt-2 mb-24 font-medium text-gray-700'>{t('titleMP')}</div>
          <div className='font-semibold text-gray-800 whitespace-pre-line text-h4'>{t('description')}</div>
        </div>
      </div>
      <div className='z-10 flex items-center justify-center bg-gray-light'>
        <LoginForm />
      </div>
    </div>
  );
};
