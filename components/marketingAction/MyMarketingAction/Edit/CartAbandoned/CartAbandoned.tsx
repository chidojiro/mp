import { Form, RadioGroup } from '@/components';
import { Button, Modal } from '@/components/common';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useVisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Steps } from '../Steps';
import { DateTimeDelivery } from './DateTimeDelivery';
import { MessageSetting } from './MessageSetting';
import { TargetCustomerGroup } from './TargetCustomerGroup';

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
          <DateTimeDelivery
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

  const setStepDone = (stepId: number, done: boolean) => {
    setSteps(prevState =>
      prevState.map(step => {
        return step.id === stepId ? { ...step, isDone: done } : step;
      })
    );
  };

  const onConfirm = (stepId: number) => {
    if (
      (stepId === 1 && isUseLine) ||
      (stepId === 2 && isStep2Done()) ||
      (stepId === 3 && isStep3Done()) ||
      (stepId === 4 && targetCustomers?.length)
    ) {
      setStepDone(stepId, true);
    }
  };

  const isStep2Done = useCallback(() => {
    return firstMessage && Object.keys(firstMessage).every(field => firstMessage[field]);
  }, [firstMessage]);

  const isStep3Done = useCallback(() => {
    return secondMessage && Object.keys(secondMessage).every(field => secondMessage[field]);
  }, [secondMessage]);

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: t('useLine'),
      children: renderStep1(),
    },
    {
      id: 2,
      name: t('msgSetting1'),
      children: <MessageSetting showLineSettings={isUseLine === lineOptions[0].value} />,
      showPreviewBtn: true,
    },
    {
      id: 3,
      name: t('msgSetting2'),
      children: renderStep3(),
      showPreviewBtn: true,
    },
    {
      id: 4,
      name: t('targetSetting'),
      children: <TargetCustomerGroup />,
    },
  ]);

  useEffect(() => {
    if (!isStep2Done()) {
      setStepDone(2, false);
    }
    if (!isStep3Done()) {
      setStepDone(3, false);
    }
    if (!targetCustomers?.length) {
      setStepDone(4, false);
    }
  }, [isStep2Done, isStep3Done, targetCustomers]);

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
  const unSavedSteps = steps.filter(step => !step.isDone).length;

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
        <Steps steps={steps} onConfirm={onConfirm} />
        <div className='flex justify-center mt-[60px]'>
          <Button className='mr-5 min-w-[240px] h-[52px] bg-[#FF7F5C]' onClick={onSaveAsDraft}>
            {t('saveDraft')}
          </Button>
          <Button colorScheme='negative' className='mr-5 min-w-[240px] h-[52px]'>
            {t('stopEditing')}
          </Button>
          <Button onClick={showModal} className='min-w-[480px] h-[52px]' disabled={!!unSavedSteps}>
            {t('implementTemplate')}
          </Button>
        </div>
      </Form>

      <Modal control={modalControl}>
        <div className='text-center text-gray-dark'>
          <Modal.Body className='leading-loose whitespace-pre-line'>{modalDesc()}</Modal.Body>
          <Modal.Footer className='text-medium'>
            {isGotoMABtn ? (
              <Link passHref href={gotoMyMAUrl}>
                <Modal.FooterButton colorScheme='negative' onClick={modalControl.close}>
                  {t('gotoMyMA')}
                </Modal.FooterButton>
              </Link>
            ) : (
              <>
                <Modal.FooterButton colorScheme='negative' onClick={modalControl.close}>
                  {t('cancel')}
                </Modal.FooterButton>
                <Modal.FooterButton onClick={onExecuteMA}>{t('executeTest')}</Modal.FooterButton>
              </>
            )}
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};
