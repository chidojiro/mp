import { useTranslation } from 'next-i18next';
import { EditorState } from 'draft-js';
import { useFormContext, useWatch } from 'react-hook-form';

import { Form, Icon } from '@/components/common';
import { RadioGroup } from '@/components/common/fields';
import { MessageBodyInput } from '@/components/marketingAction/Edit/MessageBodyInput';
import { getTextFromEditorState } from '@/components/marketingAction/Edit/utils';
import { LinePreview } from '@/components/marketingAction/LinePreview';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { MentionData, Option, OPTIONS } from '@/types';

type Props = {
  showLineMsg: boolean;
  mentionOptions: Option<MentionData, string>[];
  onShowModal: (type: MessageContentPreviewType) => void;
};

export const LineMessage = ({ showLineMsg, mentionOptions, onShowModal }: Props) => {
  const { t } = useTranslation('marketingAction');

  const { setValue } = useFormContext();
  const lineMessage = useWatch({ name: 'line_messages' });

  const lineTextOptions = [
    { value: OPTIONS.YES, label: t('displayMsg') },
    { value: OPTIONS.NO, label: t('noDisplay') },
  ];

  const flexMessageOptions = [
    { value: '16:9', label: t('horizontal') },
    { value: '1:1', label: '1:1' },
    { value: '9:16', label: t('portrait') },
  ];

  const handleChangeHeadings = (editorState: EditorState) => {
    const template = getTextFromEditorState(editorState);
    setValue('line_messages.flex_msg_head', template);
    setValue('line_messages.flex_msg_head_preview', getTextFromEditorState(editorState, true));
  };

  return (
    <div className='px-10 -mx-10 border-t-4 border-white pt-7 mt-7 '>
      <div className='flex items-center'>
        <Icon name='line' size={20} className='mr-2' />
        <div className='font-semibold'>{t('msgContentLine')}</div>
      </div>
      <div className='flex justify-between mt-2 mb-7'>
        <div className='flex-1 mr-10'>
          <div className='mb-4'>
            <div className='mb-2.5 font-semibold text-secondary text-medium'>
              {t('textMessage')}
            </div>
            <Form.RadioGroup name='line_messages.text_msg_display'>
              {lineTextOptions.map(option => (
                <RadioGroup.Option
                  colorScheme='secondary'
                  key={option.value}
                  className='mb-2.5 text-gray-dark text-medium'
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Form.RadioGroup>
            {showLineMsg && (
              <MessageBodyInput
                mentionOptions={mentionOptions}
                name='line_messages.text_msg_content'
                rawName='line_messages.text_msg_content_draft_raw'
              />
            )}
          </div>
          <div className='mb-4'>
            <div className='mb-2.5 font-semibold text-secondary text-medium'>
              {t('flexMessageImage')}
            </div>
            <Form.RadioGroup name='line_messages.flex_msg_image_ratio'>
              {flexMessageOptions.map(option => (
                <RadioGroup.Option
                  colorScheme='secondary'
                  key={option.value}
                  className='mb-2.5 text-gray-dark text-medium'
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Form.RadioGroup>
          </div>
          <div className='mb-4'>
            <div className='mb-2.5 font-semibold text-secondary text-medium'>
              {t('flexMessageHeadings')}
            </div>
            <Form.MentionsEditor
              mentionOptions={mentionOptions}
              singleLine
              name='line_messages.flex_msg_head_draft_raw'
              onChange={handleChangeHeadings}
              rules={{ required: true }}
            />
          </div>
          <div className='mb-4'>
            <div className='mb-2.5 font-semibold text-secondary text-medium'>
              {t('pushNotification')}
            </div>
            <div className='mb-2.5 text-gray-700 text-medium'>{t('pushNotificationDesc')}</div>
            <MessageBodyInput
              mentionOptions={mentionOptions}
              name='line_messages.push_msg_content'
              rawName='line_messages.push_msg_content_draft_raw'
            />
          </div>
        </div>
        <div>
          <div className='flex justify-between mb-2 text-medium'>
            <span className='text-secondary'>{t('preview')}</span>
            <span
              className='text-gray-700 underline cursor-pointer'
              onClick={() => onShowModal('line')}
            >
              {t('openPreview')}
            </span>
          </div>
          <LinePreview
            body={lineMessage?.text_msg_content}
            headline={lineMessage?.flex_msg_head_preview}
          />
        </div>
      </div>
    </div>
  );
};
