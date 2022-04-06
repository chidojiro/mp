import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { Button, Form } from '../common';
import { AdvancedSettings } from './AdvancedSettings';
import { BasicInformation } from './BasicInformation';
import { EmailSettings } from './EmailSettings';
import { SnsSettings } from './SnsSettings';
import { UrlSettings } from './UrlSettings';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const Settings = ({}: Props) => {
  const { t } = useTranslation('settings');
  const methods = useForm({ defaultValues: { aggregationPeriodForRfmAnalysis: 'last180Days' } });

  return (
    <Form methods={methods}>
      <div className='space-y-8'>
        <BasicInformation />
        <UrlSettings />
        <SnsSettings />
        <EmailSettings />
        <AdvancedSettings />
      </div>
      <Button className='!block mx-auto w-[480px] mt-[60px]'>{t('save')}</Button>
    </Form>
  );
};
