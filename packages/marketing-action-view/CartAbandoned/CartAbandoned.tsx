import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { PreviewOverlay } from '@/marketing-action/PreviewOverlay';
import { Answer, Message, StepBlock, TimeDelivery } from '../StepBlock';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { StepMessage } from '@/marketing-action/types';

type Props = {
  settings: any;
};

export const CartAbandoned = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();
  const [messagePreview, setMessagePreview] = useState<StepMessage>();

  const enableLine = settings.enable_line;
  const useLine = enableLine ? t('lineOption') : t('noLine');
  const firstMsg = settings.step_messages[0];
  const secondMsg = settings.step_messages[1];
  const useMsg2 = secondMsg?.send_flag ? t('msg2On') : t('msg2Off');

  const sameMessage = secondMsg?.has_self_mail_content
    ? t('deliverFirstMsg')
    : t('deliverDifferentMsg');

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
        stepName={t('msgSetting1')}
        showPreview
        handlePreview={() => {
          openPreview(firstMsg);
        }}
      >
        <TimeDelivery message={firstMsg} fromTheDateText={t('fromTheDateCartAbandoned')} />
        <Message message={firstMsg} enableLine={enableLine} />
      </StepBlock>
      <StepBlock
        stepName={t('msgSetting2')}
        showPreview
        handlePreview={() => {
          openPreview(secondMsg);
        }}
      >
        <Answer name={t('msg2Option')}>{useMsg2}</Answer>
        {secondMsg?.send_flag && (
          <>
            <Answer name={t('contentHasChanged')}>{sameMessage}</Answer>
            <TimeDelivery message={secondMsg} fromTheDateText={t('fromTheDateCartAbandoned')} />
            {secondMsg.has_self_mail_content && (
              <Message enableLine={enableLine} message={secondMsg} />
            )}
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
