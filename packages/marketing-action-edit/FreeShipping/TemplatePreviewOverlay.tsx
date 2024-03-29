import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Overlay } from '@/common/Overlay';
import { SwitchButtons } from '@/common/SwitchButtons';
import { Device } from '@/common/types';
import { VisibilityControl } from '@/common/useVisibilityControl';

import { FreeShippingTemplate } from './FreeShippingTemplate';

type Props = {
  control: VisibilityControl;
  freeShippingCost: any;
  templateSelection: string;
};

export const TemplatePreviewOverlay = ({ control, freeShippingCost, templateSelection }: Props) => {
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
          <FreeShippingTemplate
            templateSelection={templateSelection === '' ? 'template1' : templateSelection}
            freeShippingCost={freeShippingCost.target?.value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        ) : (
          <FreeShippingTemplate
            templateSelection={templateSelection === '' ? 'template1' : templateSelection}
            freeShippingCost={freeShippingCost.target?.value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
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
