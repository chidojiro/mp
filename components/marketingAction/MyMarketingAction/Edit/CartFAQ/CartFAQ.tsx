import { Form } from '@/components';
import { Button, Modal } from '@/components/common';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useVisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Steps } from '../Steps';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { ChatOverlay } from '../ChatOverlay';
import { Step1Settings } from './Step1Settings';
import { Step2Settings } from './Step2Settings';

export const CartFAQ = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm({
    defaultValues: {
      chat_settings: {
        color: '#E63E28',
        pc_appearance_time: '0',
        mobile_appearance_time: '0',
        pc_position: '0',
        mobile_position: '0',
        pc_unit: 'px',
        mobile_unit: 'px',
      },
    } as any,
  });
  const { handleSubmit, watch } = methods;
  const { control } = methods;
  const modalControl = useVisibilityControl();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);

  const step1 = useWatch({ name: 'faq_content_creation', control });
  const targetCustomers = useWatch({ name: 'target_customers', control });
  const step2 = useWatch({ name: 'chat_settings', control });
  const isStep3Done = !!targetCustomers?.length;
  const chatPreviewControl = useVisibilityControl();

  const onSubmit = (data: any) => {
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

  const setStepDone = (stepId: number, done: boolean) => {
    setSteps(prevState =>
      prevState.map(step => {
        return step.id === stepId ? { ...step, isDone: done } : step;
      })
    );
  };

  const onConfirm = (stepId: number) => {
    // KEEP FOR NOW. I need to figure out how to handle this in the form, keep until that's resolved.
    // if (stepId === 1 && step1) {
    //   // TODO save step 1
    //   setStepDone(stepId, true);
    if (stepId === 1) {
      // TODO save step 1
      setStepDone(stepId, true);
    } else if (stepId === 2 && isStep2Done()) {
      // TODO save step 2
      setStepDone(stepId, true);
    } else if (stepId === 3 && isStep3Done) {
      // TODO save step 3
      setStepDone(stepId, true);
    }
  };

  const isStep2Done = () => {
    return step2 && Object.keys(step2).every(field => step2[field]);
  };

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: t('faqContentCreation'),
      children: <Step1Settings />,
    },
    {
      id: 2,
      name: t('chatWindowSettings'),
      children: <Step2Settings />,
      showPreviewBtn: true,
    },
    {
      id: 3,
      name: t('targetSetting'),
      children: <TargetCustomerGroup isNonMember={true} />,
    },
  ]);

  useEffect(() => {
    setStepDone(1, false);
  }, [step1]);

  useEffect(() => {
    setStepDone(2, false);
  }, [step2]);

  useEffect(() => {
    setStepDone(3, false);
  }, [targetCustomers]);

  const modalDesc = () => {
    let desc = 'executeTemplate';
    if (isSaveAsDraft) {
      desc = 'alertAfterSaveAsDraft';
    } else if (isCompleted) {
      desc = 'alertAfterExecuting';
    }
    return t(desc, { template: t('cartPageFaq') });
  };

  const onShowPreview = (stepId: number) => {
    chatPreviewControl.open();
  };

  const isGotoMABtn = isCompleted || isSaveAsDraft;
  const gotoMyMAUrl = `/organizations/1/projects/1/actions/${isCompleted ? 'active' : 'draft'}`;
  const unSavedSteps = steps.filter(step => !step.isDone).length;

  return (
    <div className='relative'>
      <ActionContainer
        showUseTemplateBtn={false}
        iconName='cart-question'
        title={t('cartPageFaq')}
        description={t('cartPageFaqDescription')}
        descriptionImageUrl='/images/cart-page-faq-description.png'
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

      <ChatOverlay color={step2.color} control={chatPreviewControl} />

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
