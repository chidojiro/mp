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

  const handleTypeChange = () => {
    // TODO
    console.log('on change type');
  };

  const handleDevicesChange = () => {
    setShowMobileVersion(prevState => !prevState);
  };

  const handleDeliveryTest = () => {
    control.close();
    modalControl.open();
  };

  const handleExecuteTest = () => {
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
          <SwitchButtons onChange={handleTypeChange} items={types}></SwitchButtons>
          <SwitchButtons onChange={handleDevicesChange} items={devices}></SwitchButtons>
          <Button className='w-[240px]' onClick={handleDeliveryTest}>
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
        <Modal.Footer className='text-medium'>
          <Modal.FooterButton colorScheme='negative' onClick={modalControl.close}>
            {t('cancel')}
          </Modal.FooterButton>
          <Modal.FooterButton onClick={handleExecuteTest}>{t('executeTest')}</Modal.FooterButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
