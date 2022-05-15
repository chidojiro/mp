import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Overlay } from '@/common/Overlay';
import { SwitchButtons } from '@/common/SwitchButtons';
import { Device } from '@/common/types';
import { ChatPreview } from '@/marketing-action/ChatPreview';
import { VisibilityControl } from '@/common/useVisibilityControl';

type Props = {
  color: string;
  control: VisibilityControl;
};

export const ChatOverlay = ({ color, control }: Props) => {
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
    <Overlay control={control} title={t('preview')} className='flex flex-col items-center'>
      <ChatPreview color={color} />
      <div className='mt-[53px] text-center'>
        <SwitchButtons
          value={selectedDevice}
          className='mr-5'
          onChange={handleDeviceChange}
          items={devices}
        ></SwitchButtons>
      </div>
    </Overlay>
  );
};
