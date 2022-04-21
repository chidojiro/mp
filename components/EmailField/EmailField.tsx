import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common/Form';
import { InputProps } from '@/components/common/fields';
import { FieldProps } from '@/headless/Form';
import { EmailPattern } from '@/constants/misc';

type Props = FieldProps & Omit<InputProps, keyof FieldProps>;

export const EmailField = (props: Props) => {
  const { t } = useTranslation('login');
  const emailRules = {
    required: {
      value: true,
      message: t('email.required'),
    },
    pattern: {
      value: EmailPattern,
      message: t('email.invalidFormat'),
    },
  };
  return (
    <>
      <Form.Input {...props} type='email' rules={emailRules} />
      <Form.ErrorMessage name={props.name} />
    </>
  );
};
