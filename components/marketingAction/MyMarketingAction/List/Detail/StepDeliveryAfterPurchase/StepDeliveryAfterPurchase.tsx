import { useTranslation } from 'next-i18next';
import { Answer, Message, StepBlock, TimeDelivery } from '../StepBlock';

type Props = {
  settings: any;
};

export const StepDeliveryAfterPurchase = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const useLine = settings.enable_line ? t('lineOption') : t('noLine');
  const messages = settings.step_messages;
  const firstMsg = messages[0];

  const templateSelection =
    firstMsg.template === 'review' ? t('reviewPromotion') : t('rankingAppeal');

  const useMsg2 = firstMsg.send_flag ? t('performStep2') : t('doNotPerformStep2PerformStep1Only');

  return (
    <>
      <StepBlock stepName={t('useLine')}>
        <Answer name={t('useLine')}>{useLine}</Answer>
      </StepBlock>
      <StepBlock stepName={t('step1Setting')}>
        <TimeDelivery message={firstMsg} fromTheDateText={t('fromTheDateOfPurchase')} />
        <Answer name={t('templateSelection')}>{templateSelection}</Answer>
        <Message message={firstMsg} />
      </StepBlock>
      <StepBlock stepName={t('step2Setting')}>
        <Answer name={t('withOrWithoutStep2')}>{useMsg2}</Answer>
      </StepBlock>
    </>
  );
};
