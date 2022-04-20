import React from 'react';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { AuthApi, LoginPayload } from '@/apis/auth';
import { Form } from '@/components/common/Form';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/common/Button';
import { useStateToggle } from '@/hooks/useStateToggle';
import { useNavigator } from '@/hooks/useNavigator';

import { PasswordField } from './PasswordField';

export const LoginForm = () => {
  const { t } = useTranslation('login');
  const { t: tCommon } = useTranslation('common');
  const [isProcessing, setProcessing] = React.useState(false);
  const navigator = useNavigator();
  const methods = useForm({
    mode: 'onTouched',
  });
  const [isInvalid, setIsInvalid] = React.useState(false);

  const [showPwd, toggleShowPwd] = useStateToggle(false);
  const icon = showPwd ? <EyeIcon className='w-5 h-5' /> : <EyeOffIcon className='w-5 h-5' />;

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

  const passwordRules = {
    required: {
      value: true,
      message: t('password.required'),
    },
    minLength: {
      value: 8,
      message: t('password.minLength', { value: 8 }),
    },
    maxLength: {
      value: 48,
      message: t('password.maxLength', { value: 48 }),
    },
  };
  const emailRules = {
    required: {
      value: true,
      message: t('email.required'),
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: t('email.invalidFormat'),
    },
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
          rules={emailRules}
        />
        <Form.ErrorMessage name='email' />
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
