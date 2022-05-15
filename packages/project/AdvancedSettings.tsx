import React from 'react';
import { useTranslation } from 'next-i18next';

import { Form } from '@/common/Form';
import { Section } from '@/common/Section';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const AdvancedSettings = ({}: Props) => {
  const { t } = useTranslation('settings');
  const allROptions = [
    { label: t('last180Days'), value: 180 },
    {
      value: 60,
      label: t('last60Days'),
    },
  ];
  return (
    <div>
      <h5 className='mb-2.5'>{t('advancedSettings')}</h5>
      <Section>
        <Section.Title>{t('aggregationPeriodForRfmAnalysis')}</Section.Title>
        <Section.Content>
          <Form.Select options={allROptions} name='const_r_rfm' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('definitionOfLoyalCustomers')}</Section.Title>
        <Section.Content>
          <div className='flex items-center gap-2.5 flex-wrap text-medium'>
            {t('numberOfPurchasesInThePastYear')}
            <Form.Input name='const_f_loyal' className='w-20' />
            {t('atLeastOnceAndTheTotalAmountOfPurchasesInThePast1Year')}
            <Form.Input name='const_m_loyal' className='w-20' />
            {t('yenOrMore')}
          </div>
        </Section.Content>
      </Section>
    </div>
  );
};
