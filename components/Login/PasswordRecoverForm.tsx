import React from 'react';

import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { AuthApi, PasswordRecoverPayload } from '@/apis/auth';
import { Form, Button } from '@/components/common';

export const PasswordRecoverForm = () => {
  const { t } = useTranslation('login');
  const router = useRouter();
  const [isProcessing, setProcessing] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const methods = useForm<PasswordRecoverPayload>({
    mode: 'onTouched',
  });

  const onSubmit = async (val: PasswordRecoverPayload) => {
    try {
      setProcessing(true);
      const result = await AuthApi.recoverPassword(val);
      if (result?.status === 'error') {
        methods.setError('email', { message: t('email.notFound') });
      } else {
        setSuccess(true);
      }
      console.log(result);
      setProcessing(false);
    } catch (error) {
      console.error(error);
      setProcessing(false);
    }
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
  const handleGoToLogin = () => {
    router.replace('/login');
  };
  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('passwordReset')}</div>
      <div className='mb-5 text-left text-medium text-gray-600'>
        {t('passwordResetDescription')}
      </div>
      {!isSuccess && (
        <Form methods={methods} onSubmit={onSubmit}>
          <Form.Input
            name='email'
            className='w-full'
            type='email'
            placeholder={t('email')}
            rules={emailRules}
          />
          <Form.ErrorMessage name='email' />
          <Button type='submit' className='w-full my-4 font-bold' disabled={isProcessing}>
            {t('submit')}
          </Button>
        </Form>
      )}
      {isSuccess && (
        <div>
          <div>{t('passwordRecovery.emailSent')}</div>
          <Link href='/login'>
            <Button variant='link'>{t('passwordRecovery.gotoLogin')}</Button>
          </Link>
        </div>
      )}
    </div>
  );
};
