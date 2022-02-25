import { Form, Icon } from '@/components';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { ColorGroup } from './ColorGroup';
import { LineMessage } from './LineMessage';

export const MessageSetting = () => {
  const { t } = useTranslation('marketingAction');

  const emailFields = [
    { title: t('headLines'), content: <Form.Input name='head_lines_email' /> },
    { title: t('bodyText'), content: <Form.TextArea name='body_text' /> },
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
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('headLines')}</div>
              <Form.Input name='head_lines_email' />
            </div>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('bodyText')}</div>
              <Form.TextArea name='body_text' />
            </div>
          </div>
          <div className='w-[335px] rounded bg-white h-fit'>form</div>
        </div>
      </div>
      <div className='px-10 -mx-10 border-b-4 border-white mt-7 pb-7'>
        <div className='flex items-center'>
          <Icon name='line' size={20} className='mr-2' />
          <div className='font-semibold'>{t('msgContentLine')}</div>
        </div>
        <div className='flex justify-between mt-2'>
          <div className='flex-1 mr-10'>
            <div className='mb-4'>
              <div className='mb-2.5 font-semibold text-secondary text-medium'>{t('headLines')}</div>
              <Form.Input name='head_lines_line' />
            </div>
            <LineMessage />
          </div>
          <div className='w-[335px] rounded bg-white h-fit'>display</div>
        </div>
      </div>
      <div className='w-2/3 mt-7'>
        <div className='mb-2 font-semibold'>{t('colorSettings')}</div>
        <ColorGroup name='colors' />
      </div>
    </>
  );
};
