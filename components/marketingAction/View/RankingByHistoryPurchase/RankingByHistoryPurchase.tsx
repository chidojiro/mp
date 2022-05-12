import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';
import { ChatOverlay } from '@/components/marketingAction/Edit/ChatOverlay';
import { convertToEditorState } from '@/components/marketingAction/Edit/utils';
import { RichMessageView } from '@/components/marketingAction/View/StepBlock/RichMessageView';
import { useVisibilityControl } from '@/hooks';

import { Answer, StepBlock } from '../StepBlock';
import { ChatWindowSettings } from '../StepBlock/ChatWindowSettings';

type Props = {
  settings: any;
};

export const RankingByHistoryPurchase = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const chatPreviewControl = useVisibilityControl();

  const period = settings.report_period === 'weekly' ? t('1Week') : t('1Month');

  return (
    <>
      <StepBlock stepName={t('aggregationPeriodSettings')}>
        <Answer name={t('aggregationPeriod')}>{period}</Answer>
      </StepBlock>
      <StepBlock stepName={t('carouselDisplaySettings')}>
        <Answer name={t('carouselDisplay')}>
          <div>[{t('title')}]</div>
          <RichMessageView
            singleLine
            className='mt-2'
            value={convertToEditorState(settings.carousel[0].title_draft_raw)}
          />
          <div className='mt-3'>[{t('note')}]</div>
          <RichMessageView
            singleLine
            className='mt-2'
            value={convertToEditorState(settings.carousel[0].content_draft_raw)}
          />
        </Answer>
        <div className='text-center'>
          <Button
            colorScheme='negative'
            className='text-medium w-[240px]'
            onClick={chatPreviewControl.open}
          >
            {t('viewPreview')}
          </Button>
        </div>
      </StepBlock>
      <ChatWindowSettings settings={settings} />

      <ChatOverlay color={settings.chat_window_color} control={chatPreviewControl} />
    </>
  );
};
