import { Form, Icon } from '@/components';
import { Button, RadioGroup } from '@/components/common';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { ColorGroup } from './ColorGroup';
import { DateTime } from './DateTime';

type Props = {
  showLineSettings: boolean;
};

export const MessageSetting = ({ showLineSettings }: Props) => {
  const { t } = useTranslation('marketingAction');

  const textMessageOptions = [
    { value: 'text_message', label: t('displayMsg') },
    { value: 'no_text_message', label: t('noDisplay') },
  ];
  const showLineMsg = useWatch({ name: 'line_message_display' }) === textMessageOptions[0].value;
  const headlinesEmail = useWatch({ name: 'headlines_email' });
  const textEmail = useWatch({ name: 'text_email' });

  return (
    <>
      <div className='px-10 -mx-10 border-b-4 border-white pb-7'>
        <DateTime
          fromTheDateText={t('fromTheDateCartAbandoned')}
          inputDateName='date_cart_abandoned'
          inputTimeName='time_cart_abandoned'
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
              <Form.TextArea name='headlines_email' />
            </div>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('bodyText')}</div>
              <div className='w-fit bg-white py-2 mb-2.5 px-2.5 flex items-center rounded border border-input'>
                <Icon name='variable' className='w-4 h-3.5 mr-1' />
                <span className='text-medium text-gray-dark'>{t('variable')}</span>
              </div>
              <Form.TextArea name='text_email' />
            </div>
          </div>
          <div>
            <div className='flex justify-between mb-2 text-medium'>
              <span className='text-secondary'>{t('preview')}</span>
              <span className='text-gray-700 underline cursor-pointer'>{t('openPreview')}</span>
            </div>
            <div className='w-[335px] rounded bg-white h-fit p-5 border border-input'>
              <h2 className='mb-4 text-center text-secondary'>Brand Logo</h2>
              <div className='flex justify-center w-full'>
                <h3 className='w-[160px] mb-4 whitespace-pre-line text-gray-dark text-center'>
                  {headlinesEmail}
                </h3>
              </div>
              <div className='mb-3 font-semibold'>山田 太郎 様</div>
              <div className='mb-3 text-gray-dark'>{textEmail}</div>
              <Button className='w-full text-center'>{t('viewShoppingCart')}</Button>
            </div>
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
                <Form.RadioGroup name='line_message_display'>
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
                    <Form.TextArea name='text_line' />
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
        <ColorGroup name='colors' />
      </div>
    </>
  );
};
