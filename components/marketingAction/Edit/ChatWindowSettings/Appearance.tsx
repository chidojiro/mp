import React from 'react';

import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { ChatPreview } from '@/components/marketingAction/ChatPreview';
import { ColorGroup } from '@/components/marketingAction/ColorGroup';

import { ChatVisualImage } from './ChatVisualImage';

export const Appearance = () => {
  const { t } = useTranslation('marketingAction');
  const color = useWatch({ name: 'chat_settings.color' });
  const textColor = color === '#FFFFFF' ? 'text-gray-dark' : 'text-white';

  return (
    <div className='px-10 py-5 -mx-10 border-b-4 border-white'>
      <div className='mb-2 font-bold text-gray-dark'>{t('appearance')}</div>
      <div className='mb-2 font-bold text-medium text-secondary'>{t('chatVisualImage')}</div>
      <div className='mb-3 text-gray-700 text-medium'>{t('chatVisualImageText')}</div>
      <ChatVisualImage color={color} />
      <div className='mb-2 font-bold text-gray-dark'>{t('colorTheme')}</div>
      <div className='mb-3 text-gray-700 text-medium'>{t('selectColorTheme')}</div>
      <div className='mb-3 flex grid grid-cols-2 gap-2.5'>
        <div className=''>
          <ColorGroup isFull={true} name='chat_settings.color' cols={3} />
        </div>
        <div className='py-10 relative flex items-center justify-center min-h-[320px] rounded px-5 py-3.5 gap-2.5 bg-white'>
          <ChatPreview color={color} />
        </div>
      </div>
    </div>
  );
};
