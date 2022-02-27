import { Form } from '@/components';
import { useStateToggle } from '@/hooks';
import { LoginData } from '@/types';
import { AuthService } from '@/utils/auth';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button } from '../common/Button';

export const LoginForm = () => {
  const { t } = useTranslation('login');
  const router = useRouter();
  const schema = yup.object({
    email: yup.string().required('Field is required').email('Email is invalid'),
    password: yup.string().required('Field is required'),
  });
  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const [showPwd, toggleShowPwd] = useStateToggle(false);
  const icon = showPwd ? <EyeIcon className='w-5 h-5' /> : <EyeOffIcon className='w-5 h-5' />;

  const onSubmit = async (val: LoginData) => {
    const isSuccess = await AuthService.login(val);
    if (isSuccess) {
      router.push('/organizations/1/dashboard');
    }
  };

  return (
    <div className='w-[400px]'>
      <div className='mb-5 font-bold prose text-center text-h4'>{t('login')}</div>
      <Form methods={methods} onSubmit={onSubmit}>
        <Form.Input
          name='email'
          className='w-full mb-1'
          htmlType='email'
          placeholder={t('email')}
        />
        <Form.ErrorMessage name='email' className='mb-2'></Form.ErrorMessage>
        <Form.Input
          name='password'
          className='w-full mb-1'
          htmlType={showPwd ? 'text' : 'password'}
          placeholder={t('password')}
          innerRight={
            <div className='cursor-pointer' onClick={() => toggleShowPwd()}>
              {icon}
            </div>
          }
        />
        <Form.ErrorMessage name='password' className='mb-4'></Form.ErrorMessage>
        <Button type='submit' className='w-full font-bold'>
          {t('login')}
        </Button>
        <Button variant='link' className='!block mx-auto underline'>
          {t('forgotPassword')}
        </Button>
      </Form>
    </div>
  );
};
