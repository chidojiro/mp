import { Form } from '@/components';
import { Button, Modal } from '@/components/common';
import { ActionContainer } from '@/components/marketingAction';
import { Step } from '@/constants';
import { useVisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Steps } from '../Steps';
import { PopupSetting } from './PopupSetting';
import { TargetCustomerGroup } from './TargetCustomerGroup';

export const FreeShipping = () => {
  const { t } = useTranslation('marketingAction');
  const methods = useForm();
  const { handleSubmit } = methods;
  const { control } = methods;
  const modalControl = useVisibilityControl();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);

  const targetCustomers = useWatch({ name: 'target_customers', control });

  const onSubmit = (data: any) => {
    // handle change
    console.log('submit', data);
  };

  const showModal = () => {
    setIsCompleted(false);
    setIsSaveAsDraft(false);
    modalControl.open();
  };

  const onSaveAsDraft = () => {
    modalControl.open();
    handleSubmit(onSubmit)();
    setIsCompleted(false);
    setIsSaveAsDraft(true);
  };

  const steps: Step[] = [
    {
      name: t('popupSettings'),
      children: <PopupSetting />,
      showPreviewBtn: true,
    },
    {
      name: t('targetSetting'),
      children: <TargetCustomerGroup />,
      showPreviewBtn: false,
      isDone: targetCustomers?.length,
    },
  ];

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
        <Steps steps={steps} />
        <div className='flex justify-center'>
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
          <Button onClick={showModal} className='min-w-[480px] h-[52px]'>
            {t('implementTemplate')}
          </Button>
        </div>
      </Form>

      <Modal control={modalControl}>
        <div className='text-center text-gray-dark'>
          <Modal.Body className='leading-loose whitespace-pre-line'>To do</Modal.Body>
        </div>
      </Modal>
    </div>
  );
};
