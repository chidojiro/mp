import React from 'react';
import { Icon } from '@/components/common/Icon/Icon';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = CSVButtonProps;

export type CSVButtonProps = {
  /**
   * Function to call on click.
  */
  onClick?: (value: any) => void
}

export const CSVButton = ({onClick, ...props}: CSVButtonProps) => (
  <div className="rounded bg-white border border-gray-500 w-40 h-10 flex items-center justify-center text-medium font-bold cursor-pointer" onClick={onClick} {...props}>
    <Icon name="download" className="h-4 w-4 mr-2" /><span>CSVダウンロード</span>
  </div>
);