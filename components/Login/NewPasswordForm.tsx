import React from 'react';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { AuthApi, LoginPayload } from '@/apis/auth';
import { Form } from '@/components/common/Form';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Button } from '@/components/common/Button';
import { useStateToggle } from '@/hooks/useStateToggle';
import { useNavigator } from '@/hooks/useNavigator';

export const NewPasswordForm = () => {
  const { t } = useTranslation('login');
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
      setProcessing(true);
      await AuthApi.login(val);
      await navigator.openDashboard();
    } catch {
      setIsInvalid(true);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('NewPasswordSetting')}</div>
      <Form methods={methods} onSubmit={onSubmit}>
        <Form.Input
          name='password'
          className='w-full mt-2'
          type={showPwd ? 'text' : 'password'}
          placeholder={t('newPassword')}
          innerRight={
            <div className='cursor-pointer select-none' onClick={() => toggleShowPwd()}>
              {icon}
            </div>
          }
          onChange={() => setIsInvalid(false)}
          rules={{ required: true }}
        />
        <Form.Input
          name='password-confirm'
          className='w-full mt-2'
          type={showPwd ? 'text' : 'password'}
          placeholder={t('newPasswordConfirm')}
          innerRight={
            <div className='cursor-pointer select-none' onClick={() => toggleShowPwd()}>
              {icon}
            </div>
          }
          onChange={() => setIsInvalid(false)}
          rules={{ required: true }}
        />
        {!!isInvalid && (
          <ErrorMessage className='mt-1'>{t('incorrectEmailOrPassword')}</ErrorMessage>
        )}
        <Button type='submit' className='w-full my-4 font-bold' disabled={isProcessing}>
          {t('change')}
        </Button>
      </Form>
    </div>
  );
};
