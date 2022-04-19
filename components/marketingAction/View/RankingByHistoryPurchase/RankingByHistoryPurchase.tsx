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
          <div
            dangerouslySetInnerHTML={{ __html: settings.carousel[0].title }}
            className='mt-2'
          ></div>
          <div className='mt-3'>[{t('note')}]</div>
          <div
            dangerouslySetInnerHTML={{ __html: settings.carousel[0].content }}
            className='mt-2'
          ></div>
        </Answer>
      </StepBlock>
      <ChatWindowSettings settings={settings} />
    </>
  );
};
