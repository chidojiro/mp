import { useTranslation } from 'next-i18next';
import { Answer, Message, StepBlock, TimeDelivery } from '../StepBlock';

type Props = {
  settings: any;
};

export const CartAbandoned = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const useLine = settings.enable_line ? t('lineOption') : t('noLine');
  const firstMsg = settings.step_messages[0];

  const useMsg2 = firstMsg.send_flag ? t('msg2On') : t('msg2Off');

  return (
    <>
      <StepBlock stepName={t('useLine')}>
        <Answer name={t('useLine')}>{useLine}</Answer>
      </StepBlock>
      <StepBlock stepName={t('msgSetting1')}>
        <TimeDelivery message={firstMsg} fromTheDateText={t('fromTheDateCartAbandoned')} />
        <Message message={firstMsg} />
      </StepBlock>
      <StepBlock stepName={t('msgSetting2')}>
        <Answer name={t('msg2Option')}>{useMsg2}</Answer>
      </StepBlock>
    </>
  );
};
