import React from 'react';
import { useTranslation } from 'next-i18next';
import { EditorState } from 'draft-js';
import { useFormContext, useWatch } from 'react-hook-form';

import { Form, Icon } from '@/components/common';
import { RadioGroup } from '@/components/common/fields';
import { ColorGroup } from '@/components/marketingAction/ColorGroup';
import { LinePreview } from '@/components/marketingAction/LinePreview';
import { MailPreview } from '@/components/marketingAction/MailPreview';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { useVariables } from '@/hooks';
import { MentionData, Option, OPTIONS } from '@/types';
import { MailContent, MarketingActionAlias, StepMessage } from '@/types/marketingAction';

import { MessageBodyInput } from '../MessageBodyInput';
import { getTextFromEditorState } from '../utils';

type Props = {
  messageNum?: string;
  useLine?: boolean;
  onShowPreview?: (message: StepMessage, type: MessageContentPreviewType) => void;
};

export const MessageContent = ({ messageNum = '', useLine = true, onShowPreview }: Props) => {
  const { t } = useTranslation('marketingAction');

  const lineTextOptions = [
    { value: OPTIONS.YES, label: t('displayMsg') },
    { value: OPTIONS.NO, label: t('noDisplay') },
  ];

  const message = useWatch<MailContent>() as any;

  const showLineMsg = message?.line_messages?.text_msg_display;

  const onShowModal = (type: MessageContentPreviewType) => {
    onShowPreview?.(message, type);
  };

  const { setValue } = useFormContext();

  const { data: variables } = useVariables(MarketingActionAlias.CART_LEFT_NOTIFICATION);
  const mentionOptions = variables.map(
    data =>
      ({
        label: data.name_display,
        value: data,
      } as Option<MentionData, string>)
  );

  const handleChangeTitle = (editorState: EditorState) => {
    const template = getTextFromEditorState(editorState);
    setValue(`${messageNum}.mail_content.title`, template);
    setValue(`${messageNum}.mail_content.title_preview`, getTextFromEditorState(editorState, true));
  };

  return (
    <div className='px-10 -mx-10 border-t-4 border-white mt-7 pb-7'>
      <div className='mt-7'>
        <div className='flex items-center'>
          <Icon name='mail' className='mr-2' size={18} />
          <div className='font-semibold'>{t('msgContentEmail')}</div>
        </div>
        <div className='flex justify-between mt-2 mb-7'>
          <div className='flex-1 mr-10'>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>
                {t('headLines')}
              </div>
              <Form.MentionsEditor
                mentionOptions={mentionOptions}
                singleLine
                name={`${messageNum}.mail_content.title_draft_raw`}
                onChange={handleChangeTitle}
                rules={{ required: true }}
              />
            </div>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('bodyText')}</div>

              <MessageBodyInput
                mentionOptions={mentionOptions}
                name={`${messageNum}.mail_content.content`}
                rawName={`${messageNum}.mail_content.content_draft_raw`}
              />
            </div>
            <div className='mt-7'>
              <div className='mb-2 font-semibold text-secondary'>{t('colorSettingsForBtn')}</div>
              <ColorGroup name={`${messageNum}.color`} />
            </div>
          </div>
          <div>
            <div className='flex justify-between mb-2 text-medium'>
              <span className='text-secondary'>{t('previewMobile')}</span>
              <span
                className='text-gray-700 underline cursor-pointer'
                onClick={() => onShowModal('mail')}
              >
                {t('openPreview')}
              </span>
            </div>
            <MailPreview
              headline={message?.mail_content?.title_preview}
              body={message?.mail_content?.content_preview}
              desktop={false}
              color={message.color}
            />
          </div>
        </div>
      </div>
      {useLine && (
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
                <Form.RadioGroup name={`${messageNum}.line_messages.text_msg_display`}>
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
                    name={`${messageNum}.line_messages.text_msg_content`}
                    rawName={`${messageNum}.line_messages.text_msg_content_draft_raw`}
                  />
                )}
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
              <LinePreview body={message?.line_messages?.text_msg_content} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
