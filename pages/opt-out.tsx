import classNames from 'classnames';

import { Button } from '@/components/common/Button';

const OptOutPage = () => {
  return (
    <div className='flex flex-col w-full h-full'>
      <div
        className={classNames(
          'h-12 px-10 bg-white',
          'flex items-center justify-between',
          'w-full z-50',
          'border-b border-input'
        )}
      >
        <div className='flex items-center h-full'>
          <img
            src='/images/synalio_header.svg'
            alt='logo'
            className='cursor-pointer h-6 w-[177px]'
          />
        </div>
      </div>
      <div className='flex-1 items-center flex flex-col mt-10'>
        <p className='mt-8 font-medium color-gray-800'>メール配信の停止手続きが完了しました。</p>
        <p className='mt-8 font-medium color-gray-800'>誤って登録解除した場合はこちら</p>
        <Button colorScheme='negative' className='text-medium w-[240px] mt-4'>
          再登録する
        </Button>
      </div>
    </div>
  );
};

export default OptOutPage;
