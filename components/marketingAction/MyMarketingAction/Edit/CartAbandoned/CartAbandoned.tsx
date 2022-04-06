import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';

import { Form } from '@/components';
import { Button, Modal } from '@/components/common';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useVisibilityControl } from '@/hooks';

import { PreviewOverlay } from '../PreviewOverlay';
import { Steps } from '../Steps';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { LineSettings } from './LineSettings';
import { Message1Settings } from './Message1Settings';
import { Message2Settings } from './Message2Settings';

export const OPTIONS = {
  YES: 'yes',
  NO: 'no',
};

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');
  const defaultMessageSettings = {
    delivery_time: '10:00',
    headline_email: t('defaultHeadline'),
    text_email: t('defaultTextEmail'),
    text_option: OPTIONS.NO,
    color: '#55C5D9',
  };
  const methods = useForm({
    defaultValues: {
      is_use_line: OPTIONS.YES,
      first_message: {
        delivery_date: '1',
        ...defaultMessageSettings,
      },
      second_message: {
        second_message_option: OPTIONS.YES,
        delivery_date: '3',
        same_message_content: OPTIONS.YES,
        ...defaultMessageSettings,
      },
      target_customers: [
        'f0_member',
        'f1',
        'f2',
        'semi_loyal',
        'loyal',
        'f1_dormant',
        'loyal_dormant',
        'other_dormant',
      ],
    } as any,
  });
  const { handleSubmit, reset } = methods;
  const { control } = methods;
  const modalControl = useVisibilityControl();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);
  const [messagePreview, setMessagePreview] = useState<any>();

  const step1 = useWatch({ name: 'is_use_line', control });
  const targetCustomers = useWatch({ name: 'target_customers', control });
  const firstMessage = useWatch({ name: 'first_message', control });
  const secondMessage = useWatch({ name: 'second_message', control });
  const isStep4Done = !!targetCustomers?.length;
  const previewMessageControl = useVisibilityControl();

  const onSubmit = (data: any) => {
    reset(data);
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

  const setStepDone = (stepId: number, done: boolean) => {
    setSteps(prevState =>
      prevState.map(step => {
        return step.id === stepId ? { ...step, isDone: done } : step;
      })
    );
  };

  const onConfirm = (stepId: number) => {
    if (stepId === 1 && step1) {
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
    const _firstMessage = { ...firstMessage };
    if (step1 === OPTIONS.NO) {
      delete _firstMessage.text_option;
      delete _firstMessage.text_line;
    } else {
      if (firstMessage?.text_option === OPTIONS.NO) {
        delete _firstMessage.text_line;
      }
    }
    return firstMessage && Object.keys(_firstMessage).every(field => _firstMessage[field]);
  };

  const isStep3Done = () => {
    const _secondMessage = { ...secondMessage };
    if (step1 === OPTIONS.NO && _secondMessage.same_message_content === OPTIONS.NO) {
      delete _secondMessage.line_option;
      delete _secondMessage.text_line;
    }
    return secondMessage && Object.keys(_secondMessage).every(field => _secondMessage[field]);
  };

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: t('useLine'),
      children: <LineSettings />,
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
  }, [step1]);

  useEffect(() => {
    if (
      step1 === OPTIONS.YES &&
      (!firstMessage?.text_option ||
        (firstMessage?.text_option === OPTIONS.YES && !firstMessage?.text_line))
    ) {
      setStepDone(2, false);
    }
    if (
      step1 === OPTIONS.YES &&
      secondMessage?.same_message_content === OPTIONS.NO &&
      (!secondMessage.headline_email ||
        !secondMessage.text_email ||
        !secondMessage?.text_option ||
        (secondMessage?.text_option === OPTIONS.YES && !secondMessage?.text_line))
    ) {
      setStepDone(3, false);
    }
  }, [step1, firstMessage, secondMessage]);

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
  const gotoMyMAUrl = `/organizations/1/projects/1/actions/${
    isCompleted ? 'active' : 'draft'
  }/1?targets=all&date=all`;
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

      <PreviewOverlay
        defaultType='mail'
        mailHeadline={messagePreview?.headline}
        mailBody={messagePreview?.messageEmail}
        lineBody={messagePreview?.messageLine}
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
                <Modal.FooterButton onClick={onExecuteMA}>
                  {t('implementTemplate')}
                </Modal.FooterButton>
              </>
            )}
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};
