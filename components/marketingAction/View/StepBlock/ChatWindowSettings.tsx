import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';
import { ChatVisualImage } from '@/components/marketingAction/ChatWindowSettings';
import { ChatOverlay } from '@/components/marketingAction/Edit/ChatOverlay';
import { useVisibilityControl } from '@/hooks';
import { ColorUtils } from '@/utils';

import { Answer } from './Answer';
import { AppearanceCond } from './AppearanceCond';
import { Color } from './Color';
import { StepBlock } from './StepBlock';

type Props = {
  settings: any;
};

export const ChatWindowSettings = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const chatPreviewControl = useVisibilityControl();

  return (
    <StepBlock stepName={t('chatWindowSettings')}>
      <Answer name={t('appearance')}>
        <div className='mb-2'>[{t('chatVisualImage')}]</div>
        <ChatVisualImage color={settings.chat_window_color} />
      </Answer>
      <Answer name={t('colorTheme')}>
        <Color
          color={settings.chat_window_color}
          label={t(ColorUtils.getName(settings.chat_window_color, true))}
        />
      </Answer>
      <AppearanceCond settings={settings} />
      <div className='text-center'>
        <Button
          colorScheme='negative'
          className='text-medium w-[240px]'
          onClick={chatPreviewControl.open}
        >
          {t('viewPreview')}
        </Button>
      </div>
      <ChatOverlay color={settings.chat_window_color} control={chatPreviewControl} />
    </StepBlock>
  );
};
