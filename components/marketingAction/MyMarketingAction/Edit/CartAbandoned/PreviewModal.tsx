import { Button, Input, Modal, SwitchButtons } from '@/components/common';
import { Overlay } from '@/components/Layout';
import { useVisibilityControl, VisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { PreviewLine } from './PreviewLine';
import { PreviewEmail } from './PreviewEmail';

export const MESSAGE_TYPE = {
  EMAIL: 'email',
  LINE: 'line',
};

type Props = {
  type: string;
  control: VisibilityControl;
  headline: string;
  messageEmail: string;
  messageLine: string;
};

export const PreviewModal = ({ type, control, headline, messageEmail, messageLine }: Props) => {
  const { t } = useTranslation('marketingAction');
  const [showMobileVersion, setShowMobileVersion] = useState(true);
  const [email, setEmail] = useState('');
  const [currType, setCurrType] = useState<number | string>(type);
  const [currMode, setCurrMode] = useState<number | string>('mobile');

  useEffect(() => {
    setCurrType(type);
  }, [type]);

  const modalControl = useVisibilityControl();

  const types = [
    { label: 'LINE', value: MESSAGE_TYPE.LINE },
    { label: t('email'), value: MESSAGE_TYPE.EMAIL },
  ];

  const devices = [
    { label: t('mobile'), value: 'mobile' },
    { label: 'PC', value: 'pc' },
  ];

  const handleTypeChange = (value: string | number) => {
    setCurrType(value);
  };

  const handleDevicesChange = (value: string | number) => {
    setCurrMode(value);
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

  const isEmail = MESSAGE_TYPE.EMAIL === currType;

  return (
    <>
      <Overlay
        control={control}
        title={t('preview')}
        onClose={() => setCurrType(type)}
        className='flex flex-col items-center'
      >
        {isEmail ? (
          <PreviewEmail
            headline={headline}
            body={messageEmail}
            showMobileVersion={showMobileVersion}
          />
        ) : (
          <PreviewLine body={messageLine} />
        )}
        <div className='mt-[53px] w-full flex items-center'>
          <SwitchButtons
            value={currType}
            className='mr-5'
            onChange={handleTypeChange}
            items={types}
          ></SwitchButtons>
          {isEmail && (
            <SwitchButtons
              value={currMode}
              className='mr-5'
              onChange={handleDevicesChange}
              items={devices}
            ></SwitchButtons>
          )}
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
