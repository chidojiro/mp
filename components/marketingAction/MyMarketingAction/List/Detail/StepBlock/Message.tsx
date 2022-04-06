import { Button } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { ColorUtils } from '@/utils';
import { useTranslation } from 'next-i18next';
import { PreviewOverlay } from '../../../Edit/PreviewOverlay';
import { Answer } from './Answer';
import { Color } from './Color';

type Props = {
  message: any;
};

export const Message = ({ message }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();
  return (
    <>
      <Answer name={t('msgContentEmail')}>
        <div>[{t('headLines')}]</div>
        <div className='mt-2'>{message.mail_content.title}</div>
        <div className='mt-3'>[{t('bodyText')}]</div>
        <div
          dangerouslySetInnerHTML={{ __html: message.mail_content.content }}
          className='mt-2'
        ></div>
      </Answer>
      <Answer name={t('msgContentLine')}>
        <div>[{t('textMessage')}]</div>
        <div className='mt-2'>{message.line_messages ? t('displayMsg') : t('noDisplay')}</div>
        <div
          dangerouslySetInnerHTML={{ __html: message.line_messages.content }}
          className='mt-2'
        ></div>
      </Answer>
      <Answer name={t('colorSettings')}>
        <Color color={message.color} label={t(ColorUtils.getName(message.color))} />
        <div className='mt-2'>{message.line_messages.content}</div>
      </Answer>
      <div className='text-center'>
        <Button colorScheme='negative' className=' w-[240px]' onClick={previewMessageControl.open}>
          {t('viewPreview')}
        </Button>
      </div>
      <PreviewOverlay
        defaultType='mail'
        mailHeadline={message.mail_content.title}
        mailBody={message.mail_content.content}
        lineBody={message.line_messages.content}
        control={previewMessageControl}
      />
    </>
  );
};
