import React from 'react';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Form } from '@/components/common';
import { RadioGroup } from '@/components/common/fields';
import { DeliveryDateTimeInput } from '@/components/marketingAction/DeliveryDateTimeInput';
import { Section } from '@/components/Section';
import { OPTIONS } from '@/types';

import { MessageContent } from './MessageContent';

type Props = {
  useLine?: boolean;
};

export const Message2Settings = ({ useLine }: Props) => {
  const { t } = useTranslation('marketingAction');
  const secondMessage = useWatch() as any;

  const sendOptions = [
    { value: OPTIONS.YES, label: t('msg2On') },
    { value: OPTIONS.NO, label: t('msg2Off') },
  ];

  const deliverSelfMessage = [
    { value: OPTIONS.NO, label: t('deliverFirstMsg') },
    { value: OPTIONS.YES, label: t('deliverDifferentMsg') },
  ];

  return (
    <>
      <div className='text-gray-dark'>
        <div className='font-bold mb-2.5'>{t('msg2Option')}</div>
        <Form.RadioGroup name='send_flag'>
          {sendOptions.map(option => (
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
      {secondMessage?.send_flag && (
        <>
          <div className='px-10 py-5 -mx-10 border-t-4 border-b-4 border-white my-7'>
            <Section.Title>{t('timeDelivery')}</Section.Title>
            <DeliveryDateTimeInput
              headingLabel={t('fromTheDateCartAbandoned')}
              inputDateName='send_after_days'
              inputTimeName='send_at'
            />
          </div>
          <div>
            <div className='font-bold text-gray-dark mb-2.5'>{t('contentHasChanged')}</div>
            <Form.RadioGroup name='has_self_mail_content'>
              {deliverSelfMessage.map(option => (
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
          {secondMessage?.has_self_mail_content && <MessageContent useLine={useLine} />}
        </>
      )}
    </>
  );
};
