import { useTranslation } from 'next-i18next';

import { Section } from '@/components/Section';
import { CheckboxGroup, Form } from '@/components/common';
import { Option } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const TargetSettingsSection = ({}: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation();

  const targetCustomers: Option<string>[] = [
    { label: tCommon('f0member'), value: 'f0_member' },
    { label: 'F1', value: 'f1' },
    { label: 'F2', value: 'f2' },
    { label: tCommon('semiLoyal'), value: 'semi_loyal' },
    { label: tCommon('loyal'), value: 'loyal' },
    { label: tCommon('f1dormant'), value: 'f1_dormant' },
    { label: tCommon('loyalDormant'), value: 'loyal_dormant' },
  ];

  return (
    <Section>
      <Section.Title>{t('targetCustomer')}</Section.Title>
      <Section.Content className='grid grid-cols-4'>
        <Form.CheckboxGroup name='targetCustomers' rules={{ required: true }}>
          {targetCustomers.map(({ value, label }) => (
            <CheckboxGroup.Option value={value} label={label} key={value} />
          ))}
        </Form.CheckboxGroup>
      </Section.Content>
    </Section>
  );
};
