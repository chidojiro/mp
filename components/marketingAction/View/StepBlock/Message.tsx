import { useTranslation } from 'next-i18next';

import { ColorUtils } from '@/utils';
import { StepMessage } from '@/types';

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
        <div
          className='mt-2'
          dangerouslySetInnerHTML={{ __html: message.mail_content.title }}
        ></div>
        <div className='mt-3'>[{t('bodyText')}]</div>
        <div
          dangerouslySetInnerHTML={{ __html: message.mail_content.content }}
          className='mt-2'
        ></div>
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
