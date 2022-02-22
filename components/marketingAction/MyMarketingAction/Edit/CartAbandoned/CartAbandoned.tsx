import { Form, RadioGroup } from '@/components';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Steps } from '../Steps';
import { MessageSetting } from './MessageSetting';
import { TargetCustomerGroup } from './TargetCustomerGroup';

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');

  const renderStep1 = () => {
    const lineOptions = [
      { value: 'line', label: t('lineOption') },
      { value: 'no_line', label: t('noLine') },
    ];
    return (
      <>
        <div className='font-bold text-gray-dark mb-2.5'>{t('useLine')}</div>
        <Form.RadioGroup name='cart_abandon_use_line'>
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
    return (
      <div>
        <div className='px-10 pb-5 -mx-10 border-b-4 border-white mb-7'>
          <div className='font-bold text-gray-dark mb-2.5'>{t('msg2Option')}</div>
          <Form.RadioGroup name='cart_abandon_use_line'>
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
        <MessageSetting />
      </div>
    );
  };

  const steps: Step[] = [
    {
      name: t('useLine'),
      isDone: true,
      children: renderStep1(),
    },
    {
      name: t('msgSetting1'),
      children: <MessageSetting />,
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
        flowImgUrl='/images/cart-abandoned-flow.png'></ActionContainer>
      <Steps className='mt-[60px]' steps={steps} />
    </div>
  );
};
