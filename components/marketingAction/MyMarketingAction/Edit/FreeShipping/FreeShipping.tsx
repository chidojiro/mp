import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useForm, useWatch } from 'react-hook-form';

import { Form } from '@/components';
import { Button, Modal } from '@/components/common';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useVisibilityControl } from '@/hooks';

import { Steps } from '../Steps';
import { TargetCustomerGroup } from '../TargetCustomerGroup';
import { PopupSetting } from './PopupSetting';
import { TemplatePreviewOverlay } from './TemplatePreviewOverlay';

export const FreeShipping = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  // const { control } = methods;
  const modalControl = useVisibilityControl();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);

  // const isStep1Done = useWatch({ name: 'is_use_popup', control });
  // const firstMessage = useWatch({ name: 'first_message', control });
  const previewMessageControl = useVisibilityControl();

  const onSubmit = (data: any) => {
    console.log('submit', data);
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
    if (stepId === 1) {
      // TODO save step 1
      setStepDone(stepId, true);
    } else if (stepId === 2) {
      // TODO save step 2
      setStepDone(stepId, true);
    }
  };

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: t('popupSettings'),
      children: <PopupSetting />,
      showPreviewBtn: true,
    },
    {
      id: 2,
      name: t('targetSetting'),
      children: <TargetCustomerGroup />,
      showPreviewBtn: false,
      // isDone: targetCustomers?.length,
    },
  ]);

  // useEffect(() => {
  //   setStepDone(1, false);
  // }, [isStep1Done]);

  // useEffect(() => {
  //   setStepDone(2, false);
  // }, [firstMessage]);

  const modalDesc = () => {
    let desc = 'executeTemplate';
    if (isSaveAsDraft) {
      desc = 'alertAfterSaveAsDraft';
    } else if (isCompleted) {
      desc = 'alertAfterExecuting';
    }
    return t(desc, { template: t('conditionalFreeShipping') });
  };

  const onShowPreview = (stepId: number) => {
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
        iconName='free-shipping'
        title={t('conditionalFreeShipping')}
        description={t('conditionalFreeShippingDescription')}
        descriptionImageUrl='/images/conditional-free-shipping-description.png'
      ></ActionContainer>
      <Form methods={methods} className='mt-[60px]'>
        <Steps steps={steps} onConfirm={onConfirm} onShowPreview={onShowPreview} />
        <div className='flex justify-center mt-10'>
          <Button
            colorScheme='negative'
            className='mr-5 min-w-[240px] h-[52px]'
            onClick={onSaveAsDraft}
          >
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

      <TemplatePreviewOverlay control={previewMessageControl} />

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
