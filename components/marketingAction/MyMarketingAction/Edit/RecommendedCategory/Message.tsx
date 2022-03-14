import { Icon } from '@/components/common';

export const Message = () => {
  return (
    <div className='w-[271px] rounded-lg text-[#222222] shadow-[0px_0px_6px_0px_#0000004D]'>
      <div className='p-5 leading-relaxed border-b-2 border-dark-gray'>
        <img
          src='https://cdn.tgdd.vn/2021/03/CookProduct/Bbq-la-gi-nguon-goc-va-cac-cach-tu-lam-bbq-tai-nha-vo-cung-don-gian-0-1200x676.jpg'
          className='w-full h-[170px]'
          alt=''
        />
        <div className='pt-4 text-[15px] font-bold '>
          【第1位】ここに商品名が入りますここに商品名が入ります
        </div>
        <div className='text-medium-sm'>
          1,200円（税込）/ ここに商品詳細が入りますここに商品詳細が入ります
        </div>
      </div>
      <div className='flex justify-between p-3'>
        <span className='text-regular-sm'>詳細を見る</span>
        <Icon name='chevron-right-circle' className='w-6 h-6' />
      </div>
    </div>
  );
};
