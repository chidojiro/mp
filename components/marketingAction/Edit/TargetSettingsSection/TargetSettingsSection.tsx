import { useTranslation } from 'next-i18next';

import { Section } from '@/components/Section';
import { CheckboxGroup, Form } from '@/components/common';
import { Option, TARGET } from '@/types';
import { TargetFilterUtils } from '@/utils';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const TargetSettingsSection = ({}: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation();

  const targetCustomers: Option<string>[] = [
    { label: tCommon('f0member'), value: TARGET.F0_MEMBER },
    { label: 'F1', value: TARGET.F1 },
    { label: 'F2', value: TARGET.F2 },
    { label: tCommon('semiLoyal'), value: TARGET.SEMI_LOYAL },
    { label: tCommon('loyal'), value: TARGET.LOYAL },
    { label: tCommon('f1dormant'), value: TARGET.F1_DORMANT },
    { label: tCommon('loyalDormant'), value: TARGET.LOYAL_DORMANT },
  ];

  return (
    <Section>
      <Section.Title>{t('targetCustomer')}</Section.Title>
      <Section.Content className='grid grid-cols-4'>
        <Form.CheckboxGroup
          name='target_segments'
          valueAs={value => TargetFilterUtils.getTargetFilters(value)}
          changeAs={value => TargetFilterUtils.getTargetCustomers(value)}
          rules={{ required: true }}>
          {targetCustomers.map(({ value, label }) => (
            <CheckboxGroup.Option value={value} label={label} key={value} />
          ))}
        </Form.CheckboxGroup>
      </Section.Content>
    </Section>
  );
};
