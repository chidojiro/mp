import React from 'react';

import { useTranslation } from 'next-i18next';

import { Section } from '@/components';

import { DeliveryDateTimeInput } from '../../DeliveryDateTimeInput';
import { MessageContent } from '../MessageContent';

type Props = {
  useLine?: boolean;
};

export const Message1Settings = ({ useLine = true }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <Section.Title>{t('timeDelivery')}</Section.Title>
      <DeliveryDateTimeInput
        headingLabel={t('fromTheDateCartAbandoned')}
        inputDateName='send_after_days'
        inputTimeName='send_at'
      />
      <MessageContent useLine={useLine} />
    </>
  );
};
