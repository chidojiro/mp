import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common';
import { FieldProps } from '@/headless/Form';
import { useStateToggle } from '@/hooks/useStateToggle';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import { PasswordInputProps } from '../common/fields';

type Props = FieldProps & Omit<PasswordInputProps, keyof FieldProps>;

export const PasswordField = (props: Props) => {
  const { t } = useTranslation('common');
  const [showPwd, toggleShowPwd] = useStateToggle(false);
  const icon = showPwd ? <EyeIcon className='w-5 h-5' /> : <EyeOffIcon className='w-5 h-5' />;
  const passwordRules = {
    required: {
      value: true,
      message: t('password.required'),
    },
    minLength: {
      value: 8,
      message: t('password.lengthRule'),
    },
    maxLength: {
      value: 48,
      message: t('password.lengthRule'),
    },
  };
  return (
    <>
      <Form.Input
        {...props}
        type={showPwd ? 'text' : 'password'}
        innerRight={
          <div className='cursor-pointer select-none' onClick={() => toggleShowPwd()}>
            {icon}
          </div>
        }
        rules={passwordRules}
      />
      <Form.ErrorMessage name={props.name} />
    </>
  );
};
