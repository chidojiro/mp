import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { PreviewOverlay } from '@/marketing-action/PreviewOverlay';
import { Answer, Message, StepBlock, TimeDelivery } from '../StepBlock';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { StepMessage } from '@/marketing-action/types';
import { StepDeliverySetting } from '@/marketing-action/types';

type Props = {
  settings: StepDeliverySetting;
};

export const StepDeliveryAfterPurchase = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();
  const [messagePreview, setMessagePreview] = useState<StepMessage>();

  const enableLine = settings.enable_line;
  const useLine = enableLine ? t('lineOption') : t('noLine');
  const messages = settings.step_messages;
  const firstMsg = messages[0];
  const secondMsg = settings.step_messages[1];

  const getTemplateSelection = (message: StepMessage) => {
    return message.template === 'review' ? t('reviewPromotion') : t('rankingAppeal');
  };

  const useMsg2 = secondMsg.send_flag ? t('performStep2') : t('doNotPerformStep2PerformStep1Only');
  const period = secondMsg.report_period === 'weekly' ? t('1Week') : t('1Month');

  const openPreview = (message: StepMessage) => {
    let _message = { ...message };
    if (!_message.send_flag || !_message.has_self_mail_content) {
      _message = firstMsg;
    }
    setMessagePreview(_message);
    previewMessageControl.open();
  };

  return (
    <>
      <StepBlock stepName={t('useLine')}>
        <Answer name={t('useLine')}>{useLine}</Answer>
      </StepBlock>
      <StepBlock
        stepName={t('step1Setting')}
        showPreview
        handlePreview={() => {
          openPreview(firstMsg);
        }}
      >
        <TimeDelivery message={firstMsg} fromTheDateText={t('fromTheDateOfPurchase')} />
        <Answer name={t('templateSelection')}>{getTemplateSelection(firstMsg)}</Answer>
        <Message message={firstMsg} enableLine={enableLine} />
      </StepBlock>
      <StepBlock
        stepName={t('step2Setting')}
        showPreview
        handlePreview={() => {
          openPreview(secondMsg);
        }}
      >
        <Answer name={t('withOrWithoutStep2')}>{useMsg2}</Answer>
        {secondMsg?.send_flag && (
          <>
            <TimeDelivery message={secondMsg} fromTheDateText={t('fromTheDateOfPurchase')} />
            <Answer name={t('templateSelection')}>{getTemplateSelection(secondMsg)}</Answer>
            <Answer name={t('aggregationPeriod')}>{period}</Answer>
            <Message enableLine={enableLine} message={secondMsg} />
          </>
        )}
      </StepBlock>
      <PreviewOverlay
        defaultType='mail'
        mailHeadline={messagePreview?.mail_content.title || ''}
        mailBody={messagePreview?.mail_content.content || ''}
        lineHeadline={messagePreview?.line_messages.flex_msg_head || ''}
        lineBody={messagePreview?.line_messages.text_msg_content || ''}
        control={previewMessageControl}
        enableLine={enableLine}
      />
    </>
  );
};
