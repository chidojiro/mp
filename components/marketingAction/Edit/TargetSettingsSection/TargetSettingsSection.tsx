import { useTranslation } from 'next-i18next';

import { Section } from '@/components/Section';
import { Form } from '@/components/common';
import { Option, TARGET } from '@/types';
import { TargetFilterUtils } from '@/utils';

import { TargetCustomer } from '../TargetCustomerGroup/TargetCustomer';

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
    { label: tCommon('otherDormant'), value: TARGET.OTHER_DORMANT },
  ];

  return (
    <Section>
      <Section.Title>{t('targetCustomer')}</Section.Title>
      <Section.Content className='grid grid-cols-4'>
        <Form.CheckboxGroup
          name='target_segments'
          valueAs={value => TargetFilterUtils.getTargetFilters(value)}
          changeAs={value => TargetFilterUtils.getTargetCustomers(value)}
          rules={{ required: true }}
        >
          {targetCustomers.map(option => (
            <TargetCustomer key={option.value} option={option} />
          ))}
        </Form.CheckboxGroup>
      </Section.Content>
    </Section>
  );
};
