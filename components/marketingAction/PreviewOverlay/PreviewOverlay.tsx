import React, { useEffect, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { Button, Form, Modal, SwitchButtons } from '@/components/common';
import { Overlay } from '@/components/Layout';
import { useVisibilityControl, VisibilityControl } from '@/hooks';
import { Device, Option } from '@/types';
import { EmailPattern } from '@/constants';
import { MarketingActionAPI } from '@/apis';

import { LinePreview } from '../LinePreview';
import { MailPreview } from '../MailPreview';
import { MessageContentPreviewType } from '../MessageContentPreview';

type Props = {
  defaultType: MessageContentPreviewType;
  control: VisibilityControl;
  mailHeadline: string;
  mailBody: string;
  lineBody: string;
  color?: string;
  enableLine?: boolean;
};

export const PreviewOverlay = ({
  defaultType,
  control,
  mailHeadline,
  mailBody,
  lineBody = '',
  color,
  enableLine = true,
}: Props) => {
  const { t } = useTranslation('marketingAction');
  const [selectedType, setSelectedType] = useState<MessageContentPreviewType>(defaultType);
  const [selectedDevice, setDevice] = useState<Device>('mobile');
  const [isFromTestModal, setIsFromTestModal] = useState(false);

  const methods = useForm({});
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (control.visible && !isFromTestModal) {
      setSelectedType(defaultType);
    }
  }, [control.visible, isFromTestModal, defaultType]);

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

  const handleExecuteTest = async ({ email }: any) => {
    const data = {
      type: isMail ? 'email' : 'line',
      content: {
        to: email,
        subject: isMail ? mailHeadline : '',
        body: isMail ? mailBody : lineBody,
      },
    };

    await MarketingActionAPI.deliveryTestMail(data);

    reset({});
    modalControl.close();
  };

  const onCloseModal = () => {
    reset({});
    modalControl.close();
    setIsFromTestModal(true);
    control.open();
  };

  const isMail = selectedType === 'mail';

  return (
    <>
      <Overlay
        onClose={() => setIsFromTestModal(false)}
        control={control}
        title={t('preview')}
        className='flex flex-col items-center justify-between h-[95%] w-[65%]'
      >
        {isMail ? (
          <MailPreview
            headline={mailHeadline}
            body={mailBody}
            desktop={selectedDevice === 'desktop'}
            color={color}
            isOverlay
          />
        ) : (
          <LinePreview isOverlay body={lineBody} desktop={selectedDevice === 'desktop'} />
        )}
        <div className='flex items-center justify-center w-full'>
          {enableLine && (
            <SwitchButtons
              value={selectedType}
              className='mr-5'
              onChange={handleTypeChange}
              items={types}
            ></SwitchButtons>
          )}
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
      <Form methods={methods}>
        <Modal control={modalControl}>
          <Modal.Header>{t('testDeliveryEmail')}</Modal.Header>
          <Modal.Body className='text-gray-dark'>
            <div className='mb-5'>{t('testDeliveryEmailDesc')}</div>
            <div className='text-secondary mb-2.5 font-bold text-medium'>
              {t('emailAddForTest')}
            </div>
            <Form.Input
              name='email'
              rules={{
                required: true,
                pattern: EmailPattern,
              }}
            />
          </Modal.Body>
          <Modal.Footer className='text-medium'>
            <Modal.FooterButton colorScheme='negative' onClick={onCloseModal}>
              {t('cancel')}
            </Modal.FooterButton>
            <Modal.FooterButton onClick={handleSubmit(handleExecuteTest)}>
              {t('executeTest')}
            </Modal.FooterButton>
          </Modal.Footer>
        </Modal>
      </Form>
    </>
  );
};
