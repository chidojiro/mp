import React from 'react';

import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { AuthApi, LoginPayload } from '@/apis/auth';
import { Form } from '@/components/common/Form';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/common/Button';
import { useNavigator } from '@/hooks/useNavigator';

import { PasswordField } from '../PasswordField/PasswordField';
import { EmailField } from '../EmailField';

export const LoginForm = () => {
  const { t } = useTranslation('login');
  const [isProcessing, setProcessing] = React.useState(false);
  const navigator = useNavigator();
  const methods = useForm({
    mode: 'onTouched',
  });
  const [isInvalid, setIsInvalid] = React.useState(false);

  const onSubmit = async (val: LoginPayload) => {
    try {
      methods.clearErrors();
      setProcessing(true);
      await AuthApi.login(val);
      setProcessing(false);
      await navigator.openDashboard();
    } catch (error) {
      console.error(error);
      // show error message
      setIsInvalid(true);

      // show error border on fields
      methods.setError('email', { message: '' });
      methods.setError('password', { message: '' });
      // focus on email field
      methods.setFocus('email');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('login')}</div>
      <Form methods={methods} onSubmit={onSubmit}>
        <EmailField name='email' className='w-full' placeholder={t('email')} />
        <PasswordField name='password' placeholder={t('password')} className='w-full mt-2' />
        <div className='mt-2'>
          {isInvalid && <ErrorMessage>{t('incorrectEmailOrPassword')}</ErrorMessage>}
        </div>
        <Button type='submit' className='w-full my-4 font-bold' disabled={isProcessing}>
          {t('login')}
        </Button>
        <Link href='/password/recover'>
          <Button variant='link' className='!block mx-auto'>
            {t('forgotPassword')}
          </Button>
        </Link>
      </Form>
    </div>
  );
};
