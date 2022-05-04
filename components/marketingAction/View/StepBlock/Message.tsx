import { useTranslation } from 'next-i18next';

import { RichMessageView } from '@/components/marketingAction/View/StepBlock/RichMessageView';
import { StepMessage } from '@/types';
import { ColorUtils } from '@/utils';

import { Answer } from './Answer';
import { Color } from './Color';

type Props = {
  message: StepMessage;
  enableLine?: boolean;
};

export const Message = ({ message, enableLine = true }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <Answer name={t('msgContentEmail')}>
        <div>[{t('headLines')}]</div>
        <RichMessageView className='mt-2' rawContent={message.mail_content.title_draft_raw} />
        <div className='mt-3'>[{t('bodyText')}]</div>
        <RichMessageView className='mt-2' rawContent={message.mail_content.content_draft_raw} />
      </Answer>
      {enableLine && (
        <Answer name={t('msgContentLine')}>
          <div>[{t('textMessage')}]</div>
          <div className='mt-2'>
            {message.line_messages.text_msg_display ? t('displayMsg') : t('noDisplay')}
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: message.line_messages!.text_msg_content! }}
            className='mt-2'
          ></div>
        </Answer>
      )}

      <Answer name={t('colorSettings')}>
        <Color color={message.color} label={t(ColorUtils.getName(message.color))} />
      </Answer>
    </>
  );
};
