import React from 'react';
import { useTranslation } from 'next-i18next';

import { DeliveryDateTimeInput } from '@/components/marketingAction/DeliveryDateTimeInput';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { Section } from '@/components/Section';
import { StepMessage } from '@/types';

import { MessageContent } from './MessageContent';

type Props = {
  useLine?: boolean;
  onShowPreview: (message: StepMessage, type: MessageContentPreviewType) => void;
};

export const Message1Settings = ({ useLine = true, onShowPreview }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <Section.Title>{t('timeDelivery')}</Section.Title>
      <DeliveryDateTimeInput
        headingLabel={t('fromTheDateCartAbandoned')}
        inputDateName='send_after_days'
        inputTimeName='send_at'
      />
      <MessageContent useLine={useLine} onShowPreview={onShowPreview} />
    </>
  );
};
