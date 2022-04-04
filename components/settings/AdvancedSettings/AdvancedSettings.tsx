import { Form } from '../../common';
import { Section } from '../../Section';
import { useTranslation } from 'next-i18next';
import { ImageUploader } from '@/components';
import { LinkButton } from '../LinkButton';
import React from 'react';
import { ContentEditableUtils } from '@/utils';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const AdvancedSettings = ({}: Props) => {
  const { t } = useTranslation('settings');

  return (
    <div>
      <h5 className='mb-2.5'>{t('advancedSettings')}</h5>
      <Section>
        <Section.Title>{t('aggregationPeriodForRfmAnalysis')}</Section.Title>
        <Section.Content>
          <Form.Select
            options={[{ label: t('last180Days'), value: 'last180Days' }]}
            name='aggregationPeriodForRfmAnalysis'
          />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('definitionOfLoyalCustomers')}</Section.Title>
        <Section.Content>
          <div className='flex items-center gap-2.5 flex-wrap text-medium'>
            {t('numberOfPurchasesInThePastYear')}
            <Form.Input name='numberOfPurchasesInThePastYear' className='w-20' />
            {t('atLeastOnceAndTheTotalAmountOfPurchasesInThePast1Year')}
            <Form.Input name='amount' className='w-20' />
            {t('yenOrMore')}
          </div>
        </Section.Content>
      </Section>
    </div>
  );
};
