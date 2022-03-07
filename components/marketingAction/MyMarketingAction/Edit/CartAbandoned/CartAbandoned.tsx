import { Form, RadioGroup } from '@/components';
import { Button, Modal } from '@/components/common';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useVisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Steps } from '../Steps';
import { DateTime } from './DateTime';
import { MessageSetting } from './MessageSetting';
import { TargetCustomerGroup } from './TargetCustomerGroup';

const ACTION = {
  SAVE_DRAFT: 'save_as_draft',
  EXECUTE_TEMPLATE: 'execute_template',
};

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm();
  const { handleSubmit } = methods;
  const { control } = methods;
  const modalControl = useVisibilityControl();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);

  const isUseLine = useWatch({ name: 'is_use_line', control });
  const targetCustomers = useWatch({ name: 'target_customers', control });
  const firstMessage = useWatch({ name: 'first_message', control });
  const secondMessage = useWatch({ name: 'second_message', control });

  const lineOptions = [
    { value: 'yes', label: t('lineOption') },
    { value: 'no', label: t('noLine') },
  ];

  const onSubmit = (data: any) => {
    // handle change
    console.log('submit', data);
  };

  const showModal = () => {
    setIsCompleted(false);
    setIsSaveAsDraft(false);
    modalControl.open();
  };

  const onExecuteMA = () => {
    handleSubmit(onSubmit)();
    setIsCompleted(true);
  };

  const onSaveAsDraft = () => {
    modalControl.open();
    handleSubmit(onSubmit)();
    setIsCompleted(false);
    setIsSaveAsDraft(true);
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
          <DateTime
            fromTheDateText={t('fromTheDateCartAbandoned')}
            inputDateName='second_message.delivery_date'
            inputTimeName='second_message.delivery_time'
          />
        </div>
        <div>
          <div className='font-bold text-gray-dark mb-2.5'>{t('contentHasChanged')}</div>
          <Form.RadioGroup name='second_message.same_message_delivery'>
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
      </div>
    );
  };

  const onConfirmLineSending = () => {
    // TODO
  };

  const isStep2Done = () => {
    return firstMessage && Object.keys(firstMessage).every(field => firstMessage[field]);
  };

  const isStep3Done = () => {
    return secondMessage && Object.keys(secondMessage).every(field => secondMessage[field]);
  };

  const steps: Step[] = [
    {
      name: t('useLine'),
      isDone: isUseLine,
      children: renderStep1(),
      onConfirm: onConfirmLineSending,
    },
    {
      name: t('msgSetting1'),
      isDone: isStep2Done(),
      children: <MessageSetting showLineSettings={isUseLine === lineOptions[0].value} />,
      showPreviewBtn: true,
    },
    {
      name: t('msgSetting2'),
      isDone: isStep3Done(),
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

  const modalDesc = () => {
    let desc = 'executeTemplate';
    if (isSaveAsDraft) {
      desc = 'alertAfterSaveAsDraft';
    } else if (isCompleted) {
      desc = 'alertAfterExecuting';
    }
    return t(desc, { template: t('cartAbandoned') });
  };

  const isGotoMABtn = isCompleted || isSaveAsDraft;
  const gotoMyMAUrl = `/organizations/1/projects/1/actions/${isCompleted ? 'active' : 'draft'}`;

  return (
    <div className='relative'>
      <ActionContainer
        showUseTemplateBtn={false}
        iconName='cart'
        title={t('cartAbandoned')}
        description={t('cartAbandonedDescription')}
        descriptionImageUrl='/images/cart-abandoned-description.png'
        flowImgUrl='/images/cart-abandoned-flow.png'
      ></ActionContainer>
      <Form methods={methods} className='mt-[60px]'>
        <Steps steps={steps} />
        <div className='flex justify-center'>
          <Button
            className='mr-5 min-w-[240px] h-[52px] bg-input-focus border-none'
            onClick={onSaveAsDraft}
          >
            {t('saveDraft')}
          </Button>
          <Button className='mr-5 min-w-[240px] h-[52px] bg-input-focus border-none'>
            {t('stopEditing')}
          </Button>
          <Button onClick={showModal} className='min-w-[480px] h-[52px]'>
            {t('implementTemplate')}
          </Button>
        </div>
      </Form>

      <Modal control={modalControl}>
        <div className='text-center text-gray-dark'>
          <Modal.Body className='leading-loose whitespace-pre-line'>{modalDesc()}</Modal.Body>
          <Modal.Footer>
            {isGotoMABtn ? (
              <Link passHref href={gotoMyMAUrl}>
                <Button
                  className='text-medium mr-5 min-w-[240px] bg-input-focus border-none'
                  onClick={modalControl.close}
                >
                  {t('gotoMyMA')}
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  className='text-medium mr-5 min-w-[240px] bg-input-focus border-none'
                  onClick={modalControl.close}
                >
                  {t('cancel')}
                </Button>
                <Button className='text-medium min-w-[240px]' onClick={onExecuteMA}>
                  {t('executeTest')}
                </Button>
              </>
            )}
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};
