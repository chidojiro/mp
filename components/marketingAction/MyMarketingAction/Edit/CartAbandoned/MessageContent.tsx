import { Form, Icon } from '@/components';
import { RadioGroup } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { ColorGroup } from '../ColorSettingsSection/ColorGroup';
import { EmojiSign } from '../EmojiSign';
import { MessageContentPreviewType } from '../MessageContentPreview';
import { PreviewOverlay } from '../PreviewOverlay';
import { VariableSign } from '../VariableSign';
import { OPTIONS } from './CartAbandoned';
import { PreviewEmail } from './PreviewEmail';
import { PreviewLine } from './PreviewLine';

type Props = {
  messageNum: string;
};

export const MessageContent = ({ messageNum }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();
  const [currType, setCurrType] = useState<MessageContentPreviewType>('mail');

  const lineTextOptions = [
    { value: OPTIONS.YES, label: t('displayMsg') },
    { value: OPTIONS.NO, label: t('noDisplay') },
  ];

  const showLineSettings = useWatch({ name: 'is_use_line' }) === OPTIONS.YES;

  const message = useWatch({ name: `${messageNum}` });
  const showLineMsg = message?.text_option === OPTIONS.YES;

  const onShowModal = (type: MessageContentPreviewType) => {
    setCurrType(type);
    previewMessageControl.open();
  };

  return (
    <div className='px-10 -mx-10 border-t-4 border-white mt-7 pb-7'>
      <div className='px-10 -mx-10 border-b-4 border-white mt-7'>
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
              <Form.TextArea name={`${messageNum}.headline_email`} />
            </div>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('bodyText')}</div>

              <Form.Mentions
                options={[{ label: t('brandName'), value: 'brandName' }]}
                name={`${messageNum}.text_email`}
                className='mt-5'
                label={
                  <div className='flex gap-2 mb-2'>
                    <VariableSign />
                  </div>
                }
                rules={{ required: true }}
              />
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
            <PreviewEmail
              headline={message?.headline_email}
              body={message?.text_email}
              showMobileVersion={true}
            />
          </div>
        </div>
      </div>
      {showLineSettings && (
        <div className='px-10 -mx-10 border-b-4 border-white mt-7 pb-7'>
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
                <Form.RadioGroup name={`${messageNum}.text_option`}>
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
                  <Form.Mentions
                    options={[{ label: t('brandName'), value: 'brandName' }]}
                    name={`${messageNum}.text_line`}
                    className='mt-5'
                    label={
                      <div className='flex gap-2 mb-2'>
                        <EmojiSign />
                        <VariableSign />
                      </div>
                    }
                    rules={{ required: true }}
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
              <PreviewLine body={message?.text_line} />
            </div>
          </div>
        </div>
      )}
      <div className='w-2/3 mt-7'>
        <div className='mb-2 font-semibold'>{t('colorSettings')}</div>
        <ColorGroup name={`${messageNum}.color`} />
      </div>
      <PreviewOverlay
        defaultType={currType}
        mailHeadline={message?.headline_email}
        mailBody={message?.text_email}
        lineBody={message?.text_line}
        control={previewMessageControl}
      />
    </div>
  );
};
