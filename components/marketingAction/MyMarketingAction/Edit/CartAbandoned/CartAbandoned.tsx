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
import { Message1Settings } from './Message1Settings';
import { Message2Settings } from './Message2Settings';
import { MESSAGE_TYPE, PreviewModal } from './PreviewModal';
import { TargetCustomerGroup } from './TargetCustomerGroup';

export const OPTIONS = {
  YES: 'yes',
  NO: 'no',
};

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm();
  const { handleSubmit } = methods;
  const { control } = methods;
  const modalControl = useVisibilityControl();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);
  const [messagePreview, setMessagePreview] = useState<any>();

  const isStep1Done = useWatch({ name: 'is_use_line', control });
  const targetCustomers = useWatch({ name: 'target_customers', control });
  const firstMessage = useWatch({ name: 'first_message', control });
  const secondMessage = useWatch({ name: 'second_message', control });
  const isStep4Done = !!targetCustomers?.length;
  const previewMessageControl = useVisibilityControl();

  const lineOptions = [
    { value: OPTIONS.YES, label: t('lineOption') },
    { value: OPTIONS.NO, label: t('noLine') },
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

  const setStepDone = (stepId: number, done: boolean) => {
    setSteps(prevState =>
      prevState.map(step => {
        return step.id === stepId ? { ...step, isDone: done } : step;
      })
    );
  };

  const onConfirm = (stepId: number) => {
    if (stepId === 1 && isStep1Done) {
      // TODO save step 1
      setStepDone(stepId, true);
    } else if (stepId === 2 && isStep2Done()) {
      // TODO save step 2
      setStepDone(stepId, true);
    } else if (stepId === 3 && isStep3Done()) {
      // TODO save step 3
      setStepDone(stepId, true);
    } else if (stepId === 4 && isStep4Done) {
      // TODO save step 4
      setStepDone(stepId, true);
    }
  };

  const isStep2Done = () => {
    return firstMessage && Object.keys(firstMessage).every(field => firstMessage[field]);
  };

  const isStep3Done = () => {
    return secondMessage && Object.keys(secondMessage).every(field => secondMessage[field]);
  };

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: t('useLine'),
      children: renderStep1(),
    },
    {
      id: 2,
      name: t('msgSetting1'),
      children: <Message1Settings />,
      showPreviewBtn: true,
    },
    {
      id: 3,
      name: t('msgSetting2'),
      children: <Message2Settings />,
      showPreviewBtn: true,
    },
    {
      id: 4,
      name: t('targetSetting'),
      children: <TargetCustomerGroup />,
    },
  ]);

  useEffect(() => {
    setStepDone(1, false);
  }, [isStep1Done]);

  useEffect(() => {
    setStepDone(2, false);
  }, [firstMessage]);

  useEffect(() => {
    setStepDone(3, false);
  }, [secondMessage]);

  useEffect(() => {
    setStepDone(4, false);
  }, [targetCustomers]);

  const modalDesc = () => {
    let desc = 'executeTemplate';
    if (isSaveAsDraft) {
      desc = 'alertAfterSaveAsDraft';
    } else if (isCompleted) {
      desc = 'alertAfterExecuting';
    }
    return t(desc, { template: t('cartAbandoned') });
  };

  const onShowPreview = (stepId: number) => {
    let message = firstMessage;
    if (stepId === 3 && secondMessage?.same_message_content === OPTIONS.NO) {
      message = secondMessage;
    }
    setMessagePreview({
      headline: message?.headline_email,
      messageEmail: message?.text_email,
      messageLine: message?.text_line,
    });
    previewMessageControl.open();
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
        <Steps steps={steps} onConfirm={onConfirm} onShowPreview={onShowPreview} />
        <div className='flex justify-center mt-10'>
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

      <PreviewModal
        type={MESSAGE_TYPE.EMAIL}
        headline={messagePreview?.headline}
        messageEmail={messagePreview?.messageEmail}
        messageLine={messagePreview?.messageLine}
        control={previewMessageControl}
      />

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
