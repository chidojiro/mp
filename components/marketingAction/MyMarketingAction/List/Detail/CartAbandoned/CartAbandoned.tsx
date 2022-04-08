import { useTranslation } from 'next-i18next';

import { Answer, Message, StepBlock, TimeDelivery } from '../StepBlock';

type Props = {
  settings: any;
};

export const CartAbandoned = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const enableLine = settings.enable_line;
  const useLine = enableLine ? t('lineOption') : t('noLine');
  const firstMsg = settings.step_messages[0];
  const secondMsg = settings.step_messages[1];
  const useMsg2 = secondMsg?.send_flag ? t('msg2On') : t('msg2Off');

  const sameMessage = secondMsg?.has_self_mail_content
    ? t('deliverFirstMsg')
    : t('deliverDifferentMsg');

  return (
    <>
      <StepBlock stepName={t('useLine')}>
        <Answer name={t('useLine')}>{useLine}</Answer>
      </StepBlock>
      <StepBlock stepName={t('msgSetting1')}>
        <TimeDelivery message={firstMsg} fromTheDateText={t('fromTheDateCartAbandoned')} />
        <Message message={firstMsg} enableLine={enableLine} />
      </StepBlock>
      <StepBlock stepName={t('msgSetting2')}>
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
    </>
  );
};
