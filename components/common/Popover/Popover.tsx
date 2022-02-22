import React from 'react';
import { Icon } from '@/components';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = PopoverProps;

export type PopoverProps = {
  onClick?: (value: any) => void;
  text: string;
  contentToHover: any;
};

export const Popover = ({ onClick, text, contentToHover, ...props }: PopoverProps) => (
  <div className='relative' onClick={onClick} {...props}>
    <div className='absolute top-[-42px] left-[-18px]'>
      <div className='relative bg-primary text-white rounded-full w-fit text-regular font-bold py-1 px-4 shadow-lg'>
        {text}
        <div className='absolute cursor-pointer top-[-5px] right-[-7px]'>
          <Icon name='popover-close' className='h-[18px] w-[18px] popover-shadow rounded-full' />
        </div>
        <div className='absolute bottom-[-12px] left-[30px]'>
          <Icon name='popover-tail' className='w-[42px] h-[14px]' />
        </div>
      </div>
    </div>
    <div>{contentToHover}</div>
  </div>
);

export default Popover;

// Example
// <Popover text="入力内容を確認し、問題がなければチェックを入れてください" contentToHover={"この内容でOK！"} />
