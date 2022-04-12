import { useTranslation } from 'next-i18next';

import { ColorUtils } from '@/utils';

import { Answer, Color, StepBlock } from '../StepBlock';

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
      <StepBlock stepName={t('chatWindowSettings')}>
        <Answer name={t('colorTheme')}>
          <Color
            color={settings.chat_window_color}
            label={t(ColorUtils.getName(settings.chat_window_color))}
          />
        </Answer>
      </StepBlock>
    </>
  );
};
