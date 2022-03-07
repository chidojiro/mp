import { Form, Icon } from '@/components';
import { RadioGroup } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { ColorGroup } from './ColorGroup';
import { DateTime } from './DateTime';
import { PreviewMessage } from './PreviewMessage';
import { PreviewModal } from './PreviewModal';

type Props = {
  showLineSettings: boolean;
};

export const MessageSetting = ({ showLineSettings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();

  const textMessageOptions = [
    { value: 'text_message', label: t('displayMsg') },
    { value: 'no_text_message', label: t('noDisplay') },
  ];

  const firstMessage = useWatch({ name: 'first_message' });
  const showLineMsg = firstMessage?.line_option === textMessageOptions[0].value;

  return (
    <>
      <div className='px-10 -mx-10 border-b-4 border-white pb-7'>
        <DateTime
          fromTheDateText={t('fromTheDateCartAbandoned')}
          inputDateName='first_message.delivery_date'
          inputTimeName='first_message.delivery_time'
        />
      </div>
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
              <Form.TextArea name='first_message.headlines_email' />
            </div>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('bodyText')}</div>
              <div className='w-fit bg-white py-2 mb-2.5 px-2.5 flex items-center rounded border border-input'>
                <Icon name='variable' className='w-4 h-3.5 mr-1' />
                <span className='text-medium text-gray-dark'>{t('variable')}</span>
              </div>
              <Form.TextArea name='first_message.text_email' />
            </div>
          </div>
          <div>
            <div className='flex justify-between mb-2 text-medium'>
              <span className='text-secondary'>{t('preview')}</span>
              <span
                className='text-gray-700 underline cursor-pointer'
                onClick={previewMessageControl.open}
              >
                {t('openPreview')}
              </span>
            </div>
            <PreviewMessage
              headlines={firstMessage?.headlines_email}
              body={firstMessage?.text_email}
              showMobileVersion={true}
            />
            <PreviewModal
              headlines={firstMessage?.headLines_email}
              body={firstMessage?.text_email}
              control={previewMessageControl}
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
                <Form.RadioGroup name='first_message.line_option'>
                  {textMessageOptions.map(option => (
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
                  <>
                    <div className='flex mb-2.5 text-medium text-gray-dark'>
                      <div className='w-fit bg-white py-2 px-2.5 mr-2.5 flex items-center rounded border border-input'>
                        <Icon name='emoji' className='w-4 h-3.5 mr-1' />
                        <span className='text-medium text-gray-dark'>{t('emoji')}</span>
                      </div>
                      <div className='w-fit bg-white py-2 px-2.5 flex items-center rounded border border-input'>
                        <Icon name='variable' className='w-4 h-3.5 mr-1' />
                        <span className='text-medium text-gray-dark'>{t('variable')}</span>
                      </div>
                    </div>
                    <Form.TextArea name='first_message.text_line' />
                  </>
                )}
              </div>
            </div>
            <div className='w-[335px] rounded bg-white h-fit'>preview</div>
          </div>
        </div>
      )}
      <div className='w-2/3 mt-7'>
        <div className='mb-2 font-semibold'>{t('colorSettings')}</div>
        <ColorGroup name='first_message.colors' />
      </div>
    </>
  );
};
