import { Form } from '@/common/Form';
import { Icon } from '@/common/Icon';
import { getPlainTextWithInterpolatedMentionValue } from '@/common/RichTextEditor';
import { ColorGroup } from '@/marketing-action/ColorGroup';
import { MailPreview } from '@/marketing-action/MailPreview';
import { MessageContentPreviewType } from '@/marketing-action/MessageContentPreview';
import { MarketingActionAlias, StepMessage } from '@/marketing-action/types';
import { useVariables } from '@/marketing-action/useVariables';
import { EditorState } from 'draft-js';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { LineMessage } from '../CartAbandoned/LineMessage';
import { MessageBodyInput } from '../MessageBodyInput';

type Props = {
  useLine?: boolean;
  onShowPreview?: (message: StepMessage, type: MessageContentPreviewType) => void;
};

export const MessageContent = ({ useLine = true, onShowPreview }: Props) => {
  const { t } = useTranslation('marketingAction');

  const message = useWatch<StepMessage>() as any;

  const showLineMsg = message?.line_message?.text_msg_display;

  const onShowModal = (type: MessageContentPreviewType) => {
    onShowPreview?.(message, type);
  };

  const { setValue } = useFormContext();

  const { variablesAsMentionOptions } = useVariables(MarketingActionAlias.CART_LEFT_NOTIFICATION);

  const handleChangeTitle = (editorState: EditorState) => {
    setValue('mail_content.title', getPlainTextWithInterpolatedMentionValue(editorState));
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
              <ColorGroup name='mail_content.color' />
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
              headline={message?.mail_content?.title}
              body={message?.mail_content?.content}
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
          onShowModal={onShowModal}
        />
      )}
    </div>
  );
};
