import { AuthApi, LoginPayload } from '@/apis';
import { ErrorMessage, Form } from '@/components';
import { useStateToggle } from '@/hooks';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../common/Button';

export const LoginForm = () => {
  const { t } = useTranslation('login');
  const router = useRouter();
  const methods = useForm({
    mode: 'onTouched',
  });
  const [isInvalid, setIsInvalid] = React.useState(false);

  const [showPwd, toggleShowPwd] = useStateToggle(false);
  const icon = showPwd ? <EyeIcon className='w-5 h-5' /> : <EyeOffIcon className='w-5 h-5' />;

  const onSubmit = async (val: LoginPayload) => {
    try {
      await AuthApi.login(val);

      router.push('/organizations/1/dashboard');
    } catch {
      setIsInvalid(true);
    }
  };

  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('login')}</div>
      <Form methods={methods} onSubmit={onSubmit}>
        <Form.Input
          name='email'
          className='w-full'
          type='email'
          placeholder={t('email')}
          onChange={() => setIsInvalid(false)}
          rules={{ required: true }}
        />
        <Form.Input
          name='password'
          className='w-full mt-2'
          type={showPwd ? 'text' : 'password'}
          placeholder={t('password')}
          innerRight={
            <div className='cursor-pointer' onClick={() => toggleShowPwd()}>
              {icon}
            </div>
          }
          onChange={() => setIsInvalid(false)}
          rules={{ required: true }}
        />
        {!!isInvalid && (
          <ErrorMessage className='mt-1'>{t('incorrectEmailOrPassword')}</ErrorMessage>
        )}
        <Button type='submit' className='w-full mt-4 font-bold'>
          {t('login')}
        </Button>
        <Button variant='link' className='!block mx-auto'>
          {t('forgotPassword')}
        </Button>
      </Form>
    </div>
  );
};
