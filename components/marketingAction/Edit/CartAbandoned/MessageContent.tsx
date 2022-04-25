import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Form, Icon, RadioGroup } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { Option, OPTIONS } from '@/types';
import { LinePreview } from '@/components/marketingAction/LinePreview';
import { MailPreview } from '@/components/marketingAction/MailPreview';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { ColorGroup } from '@/components/marketingAction/ColorGroup';
import { PreviewOverlay } from '@/components/marketingAction/PreviewOverlay';

import { MessageBodyInput } from '../MessageBodyInput';

type Props = {
  messageNum?: string;
  useLine?: boolean;
};

export const MessageContent = ({ messageNum = '', useLine = true }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();
  const [currType, setCurrType] = useState<MessageContentPreviewType>('mail');

  const lineTextOptions = [
    { value: OPTIONS.YES, label: t('displayMsg') },
    { value: OPTIONS.NO, label: t('noDisplay') },
  ];

  const message = useWatch() as any;

  const showLineMsg = message?.line_messages?.text_msg_display;

  const onShowModal = (type: MessageContentPreviewType) => {
    setCurrType(type);
    previewMessageControl.open();
  };

  const headingMentionOptions: Option[] = [
    { label: t('customerName'), value: 'customerName' },
    { label: t('brandName'), value: 'brandName' },
  ];

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
              <Form.ContentEditable
                options={headingMentionOptions}
                name={`${messageNum}.mail_content.title`}
                rules={{ required: true }}
              />
            </div>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('bodyText')}</div>

              <MessageBodyInput name={`${messageNum}.mail_content.content`} />
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
              headline={message?.mail_content?.title}
              body={message?.mail_content?.content}
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
                  <MessageBodyInput name={`${messageNum}.line_messages.text_msg_content`} />
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
      <PreviewOverlay
        defaultType={currType}
        mailHeadline={message?.mail_content.title}
        mailBody={message?.mail_content.content}
        lineBody={message?.line_messages?.text_msg_content}
        control={previewMessageControl}
        color={message.color}
        enableLine={useLine}
      />
    </div>
  );
};
