import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { AuthApi, PasswordRecoverPayload } from '@/apis/auth';
import { Button, Form } from '@/components/common';
import { EmailField } from '@/components/EmailField';

export const PasswordRecoverForm = () => {
  const { t } = useTranslation('login');
  const [isProcessing, setProcessing] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const methods = useForm<PasswordRecoverPayload>({
    mode: 'onTouched',
  });

  const onSubmit = async (val: PasswordRecoverPayload) => {
    setProcessing(true);
    await AuthApi.recoverPassword(val);
    setSuccess(true);
    setProcessing(false);
  };
  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('passwordReset')}</div>
      <div className='mb-5 text-left text-medium text-gray-600'>
        {t('passwordResetDescription')}
      </div>
      {!isSuccess && (
        <Form methods={methods} onSubmit={onSubmit}>
          <EmailField required name='email' className='w-full' placeholder={t('email')} />
          <Button type='submit' className='w-full my-4 font-bold' disabled={isProcessing}>
            {t('submit')}
          </Button>
          <Link href='/login'>
            <Button variant='link' className='!block mx-auto'>
              {t('login')}
            </Button>
          </Link>
        </Form>
      )}
      {isSuccess && (
        <div>
          <div>{t('message.passwordRecovery.emailSent')}</div>
          <Link href='/login' passHref={false}>
            <Button variant='link' className='!block mx-auto'>
              {t('login')}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
