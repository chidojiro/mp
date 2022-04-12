import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Icon } from '@/components/common';

import { ChatPreview } from '../ChatOverlay/ChatPreview';
import { ColorGroup } from '../ColorSettingsSection/ColorGroup';

export const Appearance = () => {
  const { t } = useTranslation('marketingAction');
  const color = useWatch({ name: 'chat_settings.color' });
  const textColor = color === '#FFFFFF' ? 'text-gray-dark' : 'text-white';

  return (
    <div className='px-10 py-5 -mx-10 border-b-4 border-white'>
      <div className='mb-2 font-bold text-gray-dark'>{t('appearance')}</div>
      <div className='mb-2 font-bold text-medium text-secondary'>{t('chatVisualImage')}</div>
      <div className='mb-3 text-gray-700 text-medium'>{t('chatVisualImageText')}</div>
      <div className='mb-3 flex grid grid-cols-2 gap-2.5'>
        <div className='relative flex items-center justify-center min-h-[320px] rounded px-5 py-3.5 bg-white'>
          <div className='absolute top-3.5 left-5 text-medium text-gray'>
            <span className='mr-5 font-bold'>PC</span> <span>W 200 × H 40</span>
          </div>
          <div
            className={classNames(
              'shadow-[0px_0px_20px_0px_#00000029] font-bold rounded-full py-2.5 px-[37px] w-fit flex',
              textColor
            )}
            style={{ backgroundColor: color }}
          >
            <Icon name='popularity-ranking' className='w-5 h-4 mr-2.5' />
            <span>{t('popularityRank')}</span>
          </div>
        </div>
        <div className='relative flex items-center justify-center min-h-[320px] rounded px-5 py-3.5 gap-2.5 bg-white'>
          <div className='absolute top-3.5 left-5 text-medium text-gray'>
            <span className='mr-5 font-bold'>{t('mobile')}</span> <span>W 100 × H 100</span>
          </div>
          <div
            className={classNames(
              'text-medium text-center shadow-[0px_0px_20px_0px_#00000029] w-[100px] h-[100px] font-bold rounded-full flex px-5 flex-col justify-center items-center',
              textColor
            )}
            style={{ backgroundColor: color }}
          >
            <span className='mb-1 whitespace-pre-line'>{t('popularityRank')}</span>
            <Icon name='popularity-ranking' className='w-5 h-4' />
          </div>
        </div>
      </div>
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
