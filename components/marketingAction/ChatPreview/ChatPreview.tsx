import { Icon } from '@/components/common';

import { Message } from './Message';

type Props = {
  color: string;
};

export const ChatPreview = ({ color }: Props) => {
  return (
    <div className='bg-white w-[360px] h-[511px] shadow-[0px_0px_27px_0px_#00000029] rounded-lg relative'>
      <div
        className='px-3 py-1 rounded-t-lg items-center justify-between flex h-[48px]'
        style={{ backgroundColor: color }}
      >
        <img src='/images/user.png' alt='' className='rounded w-9 h-9' />
        <div className='flex items-center'>
          <Icon name='home' className='w-7 h-7 text-[#E6E6E6] mr-2' />
          <Icon name='close' className='w-[18px] h-[18px] text-[#E6E6E6] mr-2' />
        </div>
      </div>
      <Message isCarousel />
    </div>
  );
};
