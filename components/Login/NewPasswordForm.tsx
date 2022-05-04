import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { AuthApi } from '@/apis';
import { Button } from '@/components/common/Button';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Form } from '@/components/common/Form';
import { PasswordField } from '@/components/PasswordField';

type Props = {
  token: string;
};

type FormData = {
  password: string;
  passwordConfirm: string;
  token: string;
};
export const NewPasswordForm = ({ token }: Props) => {
  const { t } = useTranslation('login');
  const [isProcessing, setProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSuccess, setSuccess] = React.useState(false);
  const methods = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      token,
    },
  });

  const onSubmit = async (val: FormData) => {
    if (val.password !== val.passwordConfirm) {
      methods.setError('passwordConfirm', { message: '' });
      methods.setError('password', { message: '' });
      setError('passwordNotMatched');
      return;
    }
    setError(null);
    try {
      setProcessing(true);
      const response = await AuthApi.newPassword({
        token: val.token,
        password: val.password,
      });
      setProcessing(false);
      if (response.status === 'error') {
        setError(response.error.code);
      } else {
        setSuccess(true);
        setError(null);
      }
    } catch (error) {}
  };

  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('NewPasswordSetting')}</div>
      {!isSuccess && (
        <Form methods={methods} onSubmit={onSubmit}>
          <PasswordField
            name='password'
            onChange={() => setError(null)}
            className='w-full mt-2'
            placeholder={t('newPassword')}
          />
          <PasswordField
            name='passwordConfirm'
            className='w-full mt-2'
            placeholder={t('newPasswordConfirm')}
          />
          <input type='hidden' {...methods.register('token')} />
          {!!error && <ErrorMessage className='mt-4'>{t(error)}</ErrorMessage>}
          <Button type='submit' className='w-full my-4 font-bold' disabled={isProcessing}>
            {t('change')}
          </Button>
        </Form>
      )}
      {isSuccess && (
        <>
          <div>{t('message.password.changed')}</div>
          <Link href='/login'>
            <Button variant='link' className='w-full my-4 font-bold'>
              {t('login')}
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
