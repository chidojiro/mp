import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = CustomerReportButtonProps;

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
  featuredIcon?: any;
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
      <div className='mx-5 h-full flex items-center'>{featuredIcon}</div>
      <div className='text-sm font-bold mx-1'>{label}</div>
      <div className='text-xs mx-3'>{subtext}</div>
    </div>
    <div className='flex items-center'>
      <div className='text-xs mx-1 text-gray-600'>{clickActionText}</div>
      <div className='mr-3'>
        <ChevronRightIcon className='-mr-1 ml-2 h-5 w-5 bg text-secondary' aria-hidden='true' />
      </div>
    </div>
  </div>
);
