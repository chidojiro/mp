import { Form } from '@/components';
import { Icon } from '@/components';
import { ImageUploader } from '@/components';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ColorGroup } from './ColorGroup';
import { LineMessage } from './LineMessage';

export const MessageSetting = () => {
  const { t } = useTranslation('marketingAction');

  const emailFields = [
    { title: t('logo'), content: <ImageUploader /> },
    { title: t('headLines'), content: <Form.Input name='head_line' /> },
    { title: t('bodyText'), content: <Form.TextArea name='body_text' /> },
    { title: t('storeName'), content: <Form.Input name='store_name' /> },
    { title: t('siteURL'), content: <Form.Input name='site_url' /> },
    { title: t('contactInfo'), content: <Form.Input name='contact_info' /> },
    { title: t('mainColor'), content: <ColorGroup name='main_color' /> },
    { title: t('subColor'), content: <ColorGroup name='sub_color' /> },
  ];

  return (
    <>
      <div className='px-10 -mx-10 border-b-4 border-white'>
        <div className='mb-1 font-semibold'>{t('timeDelivery')}</div>
        <div className='flex items-center text-gray-dark text-medium mb-7'>
          <div>{t('fromTheDateCartAbandoned')}</div>
          <Form.Input name='from_the_date' className='w-20 mx-2.5' />
          {t('daysAfter')}
          <Form.Input htmlType='time' name='time' className='ml-2.5 w-20' />
        </div>
      </div>
      <div className='px-10 -mx-10 border-b-4 border-white mt-7'>
        <div className='flex items-center'>
          <Icon name='mail' className='mr-2' size={18} />
          <div className='font-semibold'>{t('msgContentEmail')}</div>
        </div>
        <div className='flex justify-between mt-2'>
          <div className='flex-1 mr-10'>
            {emailFields.map((field, idx) => (
              <div key={idx} className='mb-4'>
                <div className='mb-2.5 font-semibold text-secondary'>{field.title}</div>
                {field.content}
              </div>
            ))}
          </div>
          <div className='w-[400px] rounded bg-white h-fit'>form</div>
        </div>
      </div>
      <div className='mt-7'>
        <div className='flex items-center'>
          <Icon name='line' size={20} className='mr-2' />
          <div className='font-semibold'>{t('msgContentLine')}</div>
        </div>
        <LineMessage />
      </div>
    </>
  );
};
