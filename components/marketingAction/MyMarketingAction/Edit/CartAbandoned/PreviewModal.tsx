import { Button, SwitchButtons } from '@/components/common';
import { Overlay } from '@/components/Layout';
import { VisibilityControl } from '@/hooks';
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

  return (
    <Overlay control={control} title={t('preview')} className='flex flex-col items-center'>
      <PreviewMessage headlines={headlines} body={body} showMobileVersion={showMobileVersion} />
      <div className='mt-[53px] w-[600px] flex justify-between items-center'>
        <SwitchButtons onChange={onChangeType} items={types}></SwitchButtons>
        <SwitchButtons onChange={onChangeDevices} items={devices}></SwitchButtons>
        <Button className='w-[240px] '>{t('testDelivery')}</Button>
      </div>
    </Overlay>
  );
};
