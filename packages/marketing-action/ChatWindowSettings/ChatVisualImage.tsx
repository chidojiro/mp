import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { Icon } from '@/common/Icon';

type Props = {
  color: string;
};

export const ChatVisualImage = ({ color }: Props) => {
  const { t } = useTranslation('marketingAction');
  const textColor = color === '#FFFFFF' ? 'text-gray-dark' : 'text-white';

  const renderChatVisual = (isMobile = true) => {
    return (
      <div className='relative flex items-center justify-center min-h-[320px] rounded px-5 py-3.5 bg-white'>
        <div className='absolute top-3.5 left-5 text-medium text-gray'>
          <span className='mr-5 font-bold'>{isMobile ? t('mobile') : 'PC'}</span>
          <span>W 200 × H 40</span>
        </div>
        <div
          className={classNames(
            'shadow-[0px_0px_20px_0px_#00000029] font-bold rounded-full py-2.5 flex',
            textColor,
            isMobile
              ? 'w-[100px] h-[100px] px-5 flex-col justify-center items-center flex-col-reverse text-center text-medium'
              : 'px-[37px] w-fit'
          )}
          style={{ backgroundColor: color }}
        >
          <Icon
            name='popularity-ranking'
            className={classNames('w-5 h-4', { 'mr-2.5': !isMobile })}
          />
          <span className={classNames({ 'mb-1 whitespace-pre-line': isMobile })}>
            {t('popularityRank')}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className='mb-3 flex grid grid-cols-2 gap-2.5'>
      {renderChatVisual(false)}
      {renderChatVisual()}
    </div>
  );
};
