import { Button, Input, Modal, SwitchButtons } from '@/components/common';
import { Overlay } from '@/components/Layout';
import { useVisibilityControl, VisibilityControl } from '@/hooks';
import { Device, Option } from '@/types';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { LinePreview } from '../LinePreview';
import { MailPreview } from '../MailPreview';
import { MessageContentPreviewType } from '../MessageContentPreview';

type Props = {
  defaultType: MessageContentPreviewType;
  control: VisibilityControl;
  mailHeadline: string;
  mailBody: string;
  lineBody: string;
};

export const PreviewOverlay = ({
  defaultType,
  control,
  mailHeadline,
  mailBody,
  lineBody,
}: Props) => {
  const { t } = useTranslation('marketingAction');
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState<MessageContentPreviewType>(defaultType);
  const [selectedDevice, setDevice] = useState<Device>('mobile');

  useEffect(() => {
    if (control.visible) {
      setSelectedType(defaultType);
    }
  }, [control.visible, defaultType]);

  const modalControl = useVisibilityControl();

  const types: Option<MessageContentPreviewType>[] = [
    { label: 'LINE', value: 'line' },
    { label: t('email'), value: 'mail' },
  ];

  const devices = [
    { label: t('mobile'), value: 'mobile' },
    { label: 'PC', value: 'desktop' },
  ];

  const handleTypeChange = (value: string) => {
    setSelectedType(value as MessageContentPreviewType);
  };

  const handleDeviceChange = (value: string) => {
    setDevice(value as Device);
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

  const isMail = selectedType === 'mail';

  return (
    <>
      <Overlay control={control} title={t('preview')} className='flex flex-col items-center'>
        {isMail ? (
          <MailPreview
            headline={mailHeadline}
            body={mailBody}
            desktop={selectedDevice === 'desktop'}
          />
        ) : (
          <LinePreview body={lineBody} desktop={selectedDevice === 'desktop'} />
        )}
        <div className='mt-[53px] w-full flex items-center'>
          <SwitchButtons
            value={selectedType}
            className='mr-5'
            onChange={handleTypeChange}
            items={types}
          ></SwitchButtons>
          {isMail && (
            <SwitchButtons
              value={selectedDevice}
              className='mr-5'
              onChange={handleDeviceChange}
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
