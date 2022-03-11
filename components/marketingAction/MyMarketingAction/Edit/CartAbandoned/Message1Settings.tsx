import { Section } from '@/components';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { DeliveryDateTimeInput } from '../DeliveryDateTimeInput';
import { MessageContent } from './MessageContent';

export const Message1Settings = () => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <Section.Title>{t('timeDelivery')}</Section.Title>
      <DeliveryDateTimeInput
        headingLabel={t('fromTheDateCartAbandoned')}
        inputDateName='first_message.delivery_date'
        inputTimeName='first_message.delivery_time'
      />
      <MessageContent messageNum={'first_message'} />
    </>
  );
};
