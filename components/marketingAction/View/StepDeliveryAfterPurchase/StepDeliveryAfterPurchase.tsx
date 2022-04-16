import { useTranslation } from 'next-i18next';

import { StepDeliverySetting, StepMessage } from '@/types';

import { Answer, Message, StepBlock, TimeDelivery } from '../StepBlock';

type Props = {
  settings: StepDeliverySetting;
};

export const StepDeliveryAfterPurchase = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
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

  return (
    <>
      <StepBlock stepName={t('useLine')}>
        <Answer name={t('useLine')}>{useLine}</Answer>
      </StepBlock>
      <StepBlock stepName={t('step1Setting')}>
        <TimeDelivery message={firstMsg} fromTheDateText={t('fromTheDateOfPurchase')} />
        <Answer name={t('templateSelection')}>{getTemplateSelection(firstMsg)}</Answer>
        <Message message={firstMsg} enableLine={enableLine} />
      </StepBlock>
      <StepBlock stepName={t('step2Setting')}>
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
    </>
  );
};
