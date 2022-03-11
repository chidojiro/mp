import { Form, RadioGroup, Section } from '@/components';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { DeliveryDateTimeInput } from '../DeliveryDateTimeInput';
import { OPTIONS } from './CartAbandoned';
import { MessageContent } from './MessageContent';

export const Message2Settings = () => {
  const { t } = useTranslation('marketingAction');
  const secondMessage = useWatch({ name: 'second_message' });

  const msg2DeliveryOptions = [
    { value: 'second_message_on', label: t('msg2On') },
    { value: 'second_message_off', label: t('msg2Off') },
  ];

  const deliverMessageOptions = [
    { value: OPTIONS.YES, label: t('deliverFirstMsg') },
    { value: OPTIONS.NO, label: t('deliverDifferentMsg') },
  ];

  const isNewMessage = secondMessage?.same_message_content === deliverMessageOptions[1].value;

  return (
    <>
      <div className='px-10 pb-5 -mx-10 border-b-4 border-white mb-7'>
        <div className='font-bold text-gray-dark mb-2.5'>{t('msg2Option')}</div>
        <Form.RadioGroup name='second_message.second_message_option'>
          {msg2DeliveryOptions.map(option => (
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
      <div className='px-10 pb-5 -mx-10 border-b-4 border-white mb-7'>
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
  );
};
