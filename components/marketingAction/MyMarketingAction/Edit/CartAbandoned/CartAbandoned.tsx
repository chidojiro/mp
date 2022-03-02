import { Form, RadioGroup } from '@/components';
import { Button } from '@/components/common';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Steps } from '../Steps';
import { DateTime } from './DateTime';
import { MessageSetting } from './MessageSetting';
import { TargetCustomerGroup } from './TargetCustomerGroup';

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm();
  const { control } = methods;
  const isUseLine = useWatch({ name: 'is_use_line', control });
  const targetCustomers = useWatch({ name: 'target_customers', control });

  const lineOptions = [
    { value: 'yes', label: t('lineOption') },
    { value: 'no', label: t('noLine') },
  ];

  const onSubmit = (data: any) => {
    // handle change
    console.log('submit', data);
  };

  const renderStep1 = () => {
    return (
      <>
        <div className='font-bold text-gray-dark mb-2.5'>{t('useLine')}</div>
        <Form.RadioGroup name='is_use_line'>
          {lineOptions.map(option => (
            <RadioGroup.Option
              colorScheme='secondary'
              key={option.value}
              className='mb-2.5 text-gray-dark text-medium'
              label={option.label}
              value={option.value}
            />
          ))}
        </Form.RadioGroup>
      </>
    );
  };

  const renderStep3 = () => {
    const msg2DeliveryOptions = [
      { value: 'second_message_on', label: t('msg2On') },
      { value: 'second_message_off', label: t('msg2Off') },
    ];

    const deliverMessageOptions = [
      { value: 'deliver_same_message', label: t('deliverFirstMsg') },
      { value: 'deliver_different_message', label: t('deliverDifferentMsg') },
    ];

    return (
      <div>
        <div className='px-10 pb-5 -mx-10 border-b-4 border-white mb-7'>
          <div className='font-bold text-gray-dark mb-2.5'>{t('msg2Option')}</div>
          <Form.RadioGroup name='second_message'>
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
          <div className='font-bold text-gray-dark mb-2.5'>{t('contentHasChanged')}</div>
          <Form.RadioGroup name='same_message_delivery'>
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
        <div>
          <DateTime
            fromTheDateText={t('fromTheDateCartAbandoned')}
            inputDateName='date_cart_abandoned_2'
            inputTimeName='time_cart_abandoned_2'
          />
        </div>
      </div>
    );
  };

  const steps: Step[] = [
    {
      name: t('useLine'),
      isDone: isUseLine,
      children: renderStep1(),
    },
    {
      name: t('msgSetting1'),
      children: <MessageSetting showLineSettings={isUseLine === lineOptions[0].value} />,
      showPreviewBtn: true,
    },
    {
      name: t('msgSetting2'),
      children: renderStep3(),
      showPreviewBtn: true,
    },
    {
      name: t('targetSetting'),
      children: <TargetCustomerGroup />,
      showPreviewBtn: true,
      isDone: targetCustomers?.length,
    },
  ];

  return (
    <div>
      <ActionContainer
        showUseTemplateBtn={false}
        iconName='cart'
        title={t('cartAbandoned')}
        description={t('cartAbandonedDescription')}
        descriptionImageUrl='/images/cart-abandoned-description.png'
        flowImgUrl='/images/cart-abandoned-flow.png'
      ></ActionContainer>
      <Form methods={methods} onSubmit={onSubmit} className='mt-[60px]'>
        <Steps steps={steps} />
      </Form>
      <div className='flex justify-center'>
        <Button className='mr-5 min-w-[480px] h-[52px] bg-input-focus border-none'>
          {t('saveDraft')}
        </Button>
        <Button className='min-w-[480px] h-[52px]'>{t('implementTemplate')}</Button>
      </div>
    </div>
  );
};
