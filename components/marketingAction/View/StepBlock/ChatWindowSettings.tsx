import { useTranslation } from 'next-i18next';

import { ChatVisualImage } from '@/components/marketingAction/ChatWindowSettings';
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
    </StepBlock>
  );
};
