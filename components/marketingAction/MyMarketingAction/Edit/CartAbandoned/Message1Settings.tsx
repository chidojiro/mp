import { useTranslation } from 'next-i18next';
import React from 'react';
import { DateTimeDelivery } from './DateTimeDelivery';
import { MessageContent } from './MessageContent';

export const Message1Settings = () => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <DateTimeDelivery
        fromTheDateText={t('fromTheDateCartAbandoned')}
        inputDateName='first_message.delivery_date'
        inputTimeName='first_message.delivery_time'
      />
      <MessageContent messageNum={'first_message'} />
    </>
  );
};
