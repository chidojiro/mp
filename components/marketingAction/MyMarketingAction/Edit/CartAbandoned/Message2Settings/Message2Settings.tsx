import React from 'react';

import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Form, RadioGroup, Section } from '@/components';

import { DeliveryDateTimeInput } from '../../DeliveryDateTimeInput';
import { OPTIONS } from '../CartAbandoned';
import { MessageContent } from '../MessageContent';

export const Message2Settings = () => {
  const { t } = useTranslation('marketingAction');
  const secondMessage = useWatch({ name: 'second_message' });

  const msg2DeliveryOptions = [
    { value: OPTIONS.YES, label: t('msg2On') },
    { value: OPTIONS.NO, label: t('msg2Off') },
  ];

  const deliverMessageOptions = [
    { value: OPTIONS.YES, label: t('deliverFirstMsg') },
    { value: OPTIONS.NO, label: t('deliverDifferentMsg') },
  ];

  const sendSecondMessage = secondMessage?.second_message_option === OPTIONS.YES;
  const isNewMessage = secondMessage?.same_message_content === OPTIONS.NO;

  return (
    <>
      <div className='text-gray-dark'>
        <div className='font-bold mb-2.5'>{t('msg2Option')}</div>
        <Form.RadioGroup name='second_message.second_message_option'>
          {msg2DeliveryOptions.map(option => (
            <RadioGroup.Option
              colorScheme='secondary'
              key={option.value}
              className='text-medium mb-2.5'
              label={option.label}
              value={option.value}
            />
          ))}
        </Form.RadioGroup>
      </div>
      {sendSecondMessage && (
        <>
          <div className='px-10 py-5 -mx-10 border-t-4 border-b-4 border-white my-7'>
            <Section.Title>{t('timeDelivery')}</Section.Title>
            <DeliveryDateTimeInput
              headingLabel={t('fromTheDateCartAbandoned')}
              inputDateName='second_message.delivery_date'
              inputTimeName='second_message.delivery_time'
            />
          </div>
          <div>
            <div className='font-bold text-gray-dark mb-2.5'>{t('contentHasChanged')}</div>
            <Form.RadioGroup name='second_message.same_message_content'>
              {deliverMessageOptions.map(option => (
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
          {isNewMessage && <MessageContent messageNum={'second_message'} />}
        </>
      )}
    </>
  );
};
