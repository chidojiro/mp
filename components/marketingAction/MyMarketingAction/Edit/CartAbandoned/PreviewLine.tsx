import { Button } from '@/components/common';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

type Props = {
  body: string;
  className?: string;
};

//example test message
const products: any[] = [];
for (let i = 0; i < 2; i++) {
  products.push({
    image:
      'https://cdn.tgdd.vn/2021/03/CookProduct/Bbq-la-gi-nguon-goc-va-cac-cach-tu-lam-bbq-tai-nha-vo-cung-don-gian-0-1200x676.jpg',
    id: i,
    name: 'ブルーベリーケーキ　6個セット',
    description: 'ここに商品説明が入ります。ここに商品説明が入ります。ここに商品説明が入ります。',
    price: '1,200円',
  });
}

export const PreviewLine = ({ body, className }: Props) => {
  const { t } = useTranslation('marketingAction');
  return (
    <div
      className={classNames(
        'rounded bg-[#95A6C9] opacity-100 h-fit border border-input h-[667px]',
        className,
        'w-[335px] py-4 px-1.5'
      )}
    >
      <div className={classNames('h-full w-full')}>
        {!!body && (
          <div className='flex'>
            <div className='mr-2 rounded-full w-7 h-7 bg-dark-gray'></div>
            <div className=''>
              <div className='text-[8px]'>○○○ストア</div>
              <div className='mb-3 leading-snug	 mt-1.5 max-w-[200px] rounded-lg bg-white text-gray-dark text-[#222222] text-regular-sm py-2 px-3'>
                {body}
              </div>
            </div>
          </div>
        )}
        <div className='flex flex-col h-full'>
          <div className='mr-2 rounded-full w-7 h-7 bg-dark-gray'></div>
          <div className='mt-1.5 w-full flex overflow-x-scroll pb-5 mp-scroll'>
            {products.map(product => (
              <div
                key={product.id}
                className={classNames(
                  'w-[254px] mr-2 border-2 rounded-lg border-dashed border-secondary'
                )}
              >
                <img
                  src={product.image}
                  className={classNames('rounded-t-lg', 'w-full h-[170px]')}
                />
                <div className='p-3.5 text-gray-dark'>
                  <div className='truncate font-semibold mb-2 text-gray-dark text-[22px]'>
                    {product.name}
                  </div>
                  <div className='mb-1 text-regular-sm'>{product.description}</div>
                  <h3 className='mb-5 font-semibold text-right'>{product.price}</h3>
                  <div className='text-[#6490CB] text-[15px] text-center'>{t('viewThisItem')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
