import React from 'react';
import { useTranslation } from 'next-i18next';

import { DeliveryDateTimeInput } from '@/marketing-action/DeliveryDateTimeInput';
import { MessageContentPreviewType } from '@/marketing-action/MessageContentPreview';
import { Section } from '@/common/Section';
import { MessageContent } from './MessageContent';
import { StepMessage } from '@/marketing-action/types';

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
