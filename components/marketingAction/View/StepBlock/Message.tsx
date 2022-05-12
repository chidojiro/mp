import { useTranslation } from 'next-i18next';
import { convertFromRaw, EditorState } from 'draft-js';

import { richTextEditorDecorator } from '@/components/common/fields/RichTextEditor';
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

  const convertToEditorState = (val: string | EditorState) => {
    if (typeof val === 'string') {
      return EditorState.createWithContent(
        convertFromRaw(JSON.parse(val)),
        richTextEditorDecorator
      );
    }
    return val;
  };

  const { title_draft_raw: mailTitle, content_draft_raw: mailContent } = message.mail_content;

  const {
    text_msg_display: isDisplayText,
    text_msg_content_draft_raw: content,
    flex_msg_head_draft_raw: headings,
    flex_msg_image_ratio: ratio,
    push_msg_content_draft_raw: pushMsgContent,
  } = message.line_messages;

  return (
    <>
      <Answer name={t('msgContentEmail')}>
        <div>[{t('headLines')}]</div>
        {mailTitle ? (
          <RichMessageView singleLine className='mt-2' value={convertToEditorState(mailTitle)} />
        ) : (
          <div> {message.mail_content.title} </div>
        )}

        <div className='mt-3'>[{t('bodyText')}]</div>
        <RichMessageView value={convertToEditorState(mailContent)} />
      </Answer>
      {enableLine && (
        <>
          <Answer name={t('msgContentLine')}>
            <div>[{t('textMessage')}]</div>
            <div className='mt-2'>{isDisplayText ? t('displayMsg') : t('noDisplay')}</div>
            {isDisplayText && (
              <RichMessageView singleLine className='mt-2' value={convertToEditorState(content)} />
            )}
          </Answer>
          {ratio && <Answer name={t('flexMessageImage')}>{ratio}</Answer>}
          {headings && (
            <Answer name={t('flexMessageHeadings')}>
              <RichMessageView singleLine className='mt-2' value={convertToEditorState(headings)} />
            </Answer>
          )}
          {pushMsgContent && (
            <Answer name={t('pushNotification')}>
              <RichMessageView
                singleLine
                className='mt-2'
                value={convertToEditorState(pushMsgContent)}
              />
            </Answer>
          )}
        </>
      )}
      <Answer name={t('colorSettings')}>
        <Color
          color={message.mail_content.color}
          label={t(ColorUtils.getName(message.mail_content.color))}
        />
      </Answer>
    </>
  );
};
