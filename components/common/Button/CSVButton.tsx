import React from 'react';

import { useTranslation } from 'next-i18next';

import { Icon } from '@/components/common/Icon';

export type CSVButtonProps = {
  /**
   * Function to call on click.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export const CSVButton = ({ onClick, ...props }: CSVButtonProps) => {
  const { t } = useTranslation();
  return (
    <div
      className='rounded bg-white border border-gray-500 w-40 h-10 flex items-center justify-center text-medium font-bold cursor-pointer'
      onClick={onClick}
      {...props}
    >
      <Icon name='download' className='h-4 w-4 mr-2' />
      <span>{t('csvDownload')}</span>
    </div>
  );
};
