import React from 'react';
import { useTranslation } from 'next-i18next';
import { EditorState } from 'draft-js';
import { useFormContext, useWatch } from 'react-hook-form';

import { Form, Icon } from '@/components/common';
import { ColorGroup } from '@/components/marketingAction/ColorGroup';
import { LineMessage } from '@/components/marketingAction/Edit/CartAbandoned/LineMessage';
import { MailPreview } from '@/components/marketingAction/MailPreview';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { useVariables } from '@/hooks';
import { MarketingActionAlias, StepMessage } from '@/types/marketingAction';

import { MessageBodyInput } from '../MessageBodyInput';
import { getTextFromEditorState } from '../utils';

type Props = {
  useLine?: boolean;
  onShowPreview?: (message: StepMessage, type: MessageContentPreviewType) => void;
};

export const MessageContent = ({ useLine = true, onShowPreview }: Props) => {
  const { t } = useTranslation('marketingAction');

  const message = useWatch<StepMessage>() as any;

  const showLineMsg = message?.line_messages?.text_msg_display;

  const onShowModal = (type: MessageContentPreviewType) => {
    onShowPreview?.(message, type);
  };

  const { setValue } = useFormContext();

  const { variablesAsMentionOptions } = useVariables(MarketingActionAlias.CART_LEFT_NOTIFICATION);

  const handleChangeTitle = (editorState: EditorState) => {
    const template = getTextFromEditorState(editorState);
    setValue('mail_content.title', template);
    setValue('mail_content.title_preview', getTextFromEditorState(editorState, true));
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
                mentionOptions={variablesAsMentionOptions}
                name='mail_content.title_draft_raw'
                onChange={handleChangeTitle}
                rules={{ required: true }}
              />
            </div>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('bodyText')}</div>

              <MessageBodyInput
                mentionOptions={variablesAsMentionOptions}
                name='mail_content.content'
                rawName='mail_content.content_draft_raw'
              />
            </div>
            <div className='mt-7'>
              <div className='mb-2 font-semibold text-secondary'>{t('colorSettingsForBtn')}</div>
              <ColorGroup name='color' />
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
        <LineMessage
          showLineMsg={showLineMsg}
          mentionOptions={variablesAsMentionOptions}
          message={message.line_messages}
          onShowModal={onShowModal}
        />
      )}
    </div>
  );
};
