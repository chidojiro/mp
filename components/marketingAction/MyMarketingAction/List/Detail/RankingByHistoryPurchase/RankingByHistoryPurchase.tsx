import { useTranslation } from 'next-i18next';

import { Answer, StepBlock } from '../StepBlock';
import { ChatWindowSettings } from '../StepBlock/ChatWindowSettings';

type Props = {
  settings: any;
};

export const RankingByHistoryPurchase = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const period = settings.report_period === 'weekly' ? t('1Week') : t('1Month');

  return (
    <>
      <StepBlock stepName={t('aggregationPeriodSettings')}>
        <Answer name={t('aggregationPeriod')}>{period}</Answer>
      </StepBlock>
      <StepBlock stepName={t('carouselDisplaySettings')}>
        <Answer name={t('carouselDisplay')}>
          <div>[{t('title')}]</div>
          <div className='mt-2'>{settings.carousel[0].title}</div>
          <div className='mt-3'>[{t('note')}]</div>
          <div className='mt-2'>{settings.carousel[0].content}</div>
        </Answer>
      </StepBlock>
      <ChatWindowSettings settings={settings} />
    </>
  );
};
