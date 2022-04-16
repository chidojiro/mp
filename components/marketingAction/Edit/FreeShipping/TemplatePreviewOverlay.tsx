import React, { useState } from 'react';

import { useTranslation } from 'next-i18next';

import { SwitchButtons } from '@/components/common';
import { Overlay } from '@/components/Layout';
import { VisibilityControl } from '@/hooks';
import { Device } from '@/types';

type Props = {
  control: VisibilityControl;
};

export const TemplatePreviewOverlay = ({ control }: Props) => {
  const { t } = useTranslation('marketingAction');
  const [selectedDevice, setDevice] = useState<Device>('mobile');

  const devices = [
    { label: t('mobile'), value: 'mobile' },
    { label: 'PC', value: 'desktop' },
  ];

  const handleDeviceChange = (value: string) => {
    setDevice(value as Device);
  };

  return (
    <>
      <Overlay control={control} title={t('preview')} className='flex flex-col items-center'>
        {selectedDevice === 'desktop' ? (
          <img src='http://placehold.jp/240x240.png' alt='placeholder image' />
        ) : (
          <img src='http://placehold.jp/240x240.png' alt='placeholder image' />
        )}
        <div className='mt-[53px] w-full flex items-center justify-center'>
          <SwitchButtons
            value={selectedDevice}
            onChange={handleDeviceChange}
            items={devices}
          ></SwitchButtons>
        </div>
      </Overlay>
    </>
  );
};