import { Button, Input, Modal, SwitchButtons } from '@/components/common';
import { Overlay } from '@/components/Layout';
import { useVisibilityControl, VisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { PreviewMessage } from './PreviewMessage';

type Props = {
  control: VisibilityControl;
  headlines: string;
  body: string;
};

export const PreviewModal = ({ control, headlines, body }: Props) => {
  const { t } = useTranslation('marketingAction');
  const [showMobileVersion, setShowMobileVersion] = useState(true);
  const [email, setEmail] = useState('');

  const modalControl = useVisibilityControl();

  const types = [
    { label: 'LINE', value: 'line' },
    { label: t('email'), value: 'email' },
  ];

  const devices = [
    { label: t('mobile'), value: 'mobile' },
    { label: 'PC', value: 'pc' },
  ];

  const onChangeType = () => {
    // TODO
    console.log('on change type');
  };

  const onChangeDevices = () => {
    setShowMobileVersion(prevState => !prevState);
  };

  const onTestDelivery = () => {
    control.close();
    modalControl.open();
  };

  const onExecuteTest = () => {
    if (email) {
      // TODO send
      modalControl.close();
    }
  };

  return (
    <>
      <Overlay control={control} title={t('preview')} className='flex flex-col items-center'>
        <PreviewMessage headlines={headlines} body={body} showMobileVersion={showMobileVersion} />
        <div className='mt-[53px] w-[600px] flex justify-between items-center'>
          <SwitchButtons onChange={onChangeType} items={types}></SwitchButtons>
          <SwitchButtons onChange={onChangeDevices} items={devices}></SwitchButtons>
          <Button className='w-[240px]' onClick={onTestDelivery}>
            {t('testDelivery')}
          </Button>
        </div>
      </Overlay>
      <Modal control={modalControl}>
        <Modal.Header>{t('testDeliveryEmail')}</Modal.Header>
        <Modal.Body className='text-gray-dark'>
          <div className='mb-5'>{t('testDeliveryEmailDesc')}</div>
          <div className='text-secondary mb-2.5 font-bold text-medium'>{t('emailAddForTest')}</div>
          <Input name='email_for_test' onChange={event => setEmail(event.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='text-medium mr-5 min-w-[240px] bg-input-focus border-none'
            onClick={modalControl.close}
          >
            {t('cancel')}
          </Button>
          <Button className='text-medium min-w-[240px]' onClick={onExecuteTest}>
            {t('executeTest')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
