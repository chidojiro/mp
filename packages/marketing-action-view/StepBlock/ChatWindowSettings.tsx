import { useTranslation } from 'next-i18next';

import { ColorUtils } from '@/common/utils';
import { ChatVisualImage } from '@/marketing-action/ChatWindowSettings';
import { ChatOverlay } from '@/marketing-action-edit/ChatOverlay';
import { Answer } from './Answer';
import { AppearanceCond } from './AppearanceCond';
import { Color } from './Color';
import { StepBlock } from './StepBlock';
import { useVisibilityControl } from '@/common/useVisibilityControl';

type Props = {
  settings: any;
};

export const ChatWindowSettings = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const chatPreviewControl = useVisibilityControl();

  return (
    <StepBlock
      stepName={t('chatWindowSettings')}
      showPreview
      handlePreview={chatPreviewControl.open}
    >
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
      <ChatOverlay color={settings.chat_window_color} control={chatPreviewControl} />
    </StepBlock>
  );
};
