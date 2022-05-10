import { useTranslation } from 'next-i18next';

import { InputProps } from '@/components/common/fields';
import { Form } from '@/components/common/Form';
import { EmailPattern } from '@/constants/misc';
import { FieldProps } from '@/headless/Form';

type Props = FieldProps & Omit<InputProps, keyof FieldProps>;

export const EmailField = (props: Props) => {
  const { t } = useTranslation('common');
  let emailRules: any = {
    pattern: {
      value: EmailPattern,
      message: t('email.invalidFormat'),
    },
  };
  if (props.required) {
    emailRules = {
      ...emailRules,
      required: {
        value: true,
        message: t('email.required'),
      },
    };
  }
  return (
    <>
      <Form.Input {...props} type='email' rules={emailRules} />
      <Form.ErrorMessage name={props.name} />
    </>
  );
};
