import React from 'react';

import { ChevronRightIcon } from '@heroicons/react/solid';

export type CustomerReportButtonProps = {
  /**
   * Primary button text
   */
  label?: string;
  /**
   * Subtext to be featured next to label text
   */
  subtext?: string;
  /**
   * Text to appear next to the click icon.
   */
  clickActionText?: string;
  /**
   * Main icon.
   */
  featuredIcon?: React.ReactNode;
};

export const CustomerReportButton = ({
  label,
  subtext,
  clickActionText,
  featuredIcon,
  ...props
}: CustomerReportButtonProps) => (
  <div
    className='border border-gray-500 border-solid rounded-md h-[60px] flex items-center justify-between text-gray-800 cursor-pointer'
    {...props}
  >
    <div className='flex items-center'>
      <div className='flex items-center h-full mx-5'>{featuredIcon}</div>
      <div className='flex flex-wrap items-center gap-2'>
        <div className='flex-shrink-0 text-sm font-bold'>{label}</div>
        <div className='flex-shrink-0 text-xs'>{subtext}</div>
      </div>
    </div>
    <div className='flex items-center'>
      <div className='mx-1 text-xs text-gray-600 whitespace-nowrap'>{clickActionText}</div>
      <div className='mr-3'>
        <ChevronRightIcon className='w-5 h-5 ml-2 -mr-1 bg text-secondary' aria-hidden='true' />
      </div>
    </div>
  </div>
);
