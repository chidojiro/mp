import { AuthApis, LoginPayload, ProfileApis } from '@/auth/apis';
import { Button } from '@/common/Button';
import { EmailField } from '@/common/EmailField';
import { ErrorMessage } from '@/common/ErrorMessage';
import { Form } from '@/common/Form';
import { PasswordField } from '@/common/PasswordField';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHrefs } from '@/navigation/useHrefs';

export const LoginForm = () => {
  const { t } = useTranslation('login');
  const router = useRouter();
  const { getDashboardHref } = useHrefs();
  const methods = useForm({
    mode: 'onTouched',
  });
  const {
    formState: { isSubmitSuccessful, isSubmitting },
  } = methods;
  const [isInvalid, setIsInvalid] = React.useState(false);

  const onSubmit = async (val: LoginPayload) => {
    try {
      methods.clearErrors();
      await AuthApis.login(val);
      const profile = await ProfileApis.get();
      router.push(getDashboardHref({ organizationId: profile.organization_id }));
    } catch (error) {
      console.error(error);
      // show error message
      setIsInvalid(true);

      // show error border on fields
      methods.setError('email', { message: '' });
      methods.setError('password', { message: '' });
      // focus on email field
      methods.setFocus('email');
    }
  };

  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('login')}</div>
      <Form methods={methods} onSubmit={onSubmit}>
        <EmailField required name='email' className='w-full' placeholder={t('email')} />
        <PasswordField name='password' placeholder={t('password')} className='w-full mt-2' />
        <div className='mt-2'>
          {isInvalid && <ErrorMessage>{t('incorrectEmailOrPassword')}</ErrorMessage>}
        </div>
        <Button
          type='submit'
          className='w-full my-4 font-bold'
          loading={isSubmitting}
          complete={isSubmitSuccessful}
        >
          {t('login')}
        </Button>
        <Link href='/password/recover' passHref>
          <Button variant='link' className='!block mx-auto'>
            {t('forgotPassword')}
          </Button>
        </Link>
      </Form>
    </div>
  );
};
