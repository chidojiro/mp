import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';

type Props = {
  body?: string;
  desktop?: boolean;
  isOverlay?: boolean;
};

//example test message
const products: any[] = [];
products.push({
  image: '/images/product_example1.png',
  id: 1,
  name: 'ブルーベリーケーキ　6個セット',
  description: 'ここに商品説明が入ります。ここに商品説明が入ります。ここに商品説明が入ります。',
  price: '1,200円',
});
products.push({
  image: '/images/product_example2.png',
  id: 2,
  name: 'マカロン　ローズ　24個セット',
  description: 'ここに商品説明が入ります。ここに商品説明が入ります。ここに商品説明が入ります。',
  price: '3,600円（税込）',
});

const btnHeightWithMargin = '85px';

export const LinePreview = ({ body, isOverlay = false }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <div
      className={classNames(
        'rounded bg-[#95A6C9] opacity-100 border border-input w-[335px] py-4 px-1.5'
      )}
      style={{ height: isOverlay ? `calc(100% - ${btnHeightWithMargin})` : '667px' }}
    >
      <div className='w-full h-full overflow-auto mp-scroll'>
        {!!body && (
          <div className='flex'>
            <div className='mr-3 bg-gray-500 rounded-full w-7 h-7'></div>
            <div className=''>
              <div className='text-[8px]'>○○○ストア</div>
              <div
                className={classNames(
                  'relative mb-3 leading-snug whitespace-pre-line mt-1.5 max-w-[200px] rounded-lg bg-white text-gray-dark text-[#222222] text-regular-sm py-2 px-3',
                  "before:content-[''] before:absolute before:border-white before:top-0 before:left-[-7px]",
                  'before:w-[11px] before:h-[11px] before:border-b-[7px] before:rounded-bl-[40px_40px]'
                )}
              >
                {body}
              </div>
            </div>
          </div>
        )}
        <div className='flex flex-col flex-1'>
          <div className='mr-2 bg-gray-500 rounded-full w-7 h-7'></div>
          <div className='mt-1.5 w-full flex flex-1'>
            {products.map(product => (
              <div
                key={product.id}
                className='w-[254px] bg-white mr-2 border-2 h-fit rounded-lg border-dashed border-secondary'
              >
                <img alt='' src={product.image} className='rounded-t-lg w-full h-[170px]' />
                <div className='p-3.5 text-gray-dark'>
                  <div className='truncate font-semibold mb-2 text-gray-dark text-[22px]'>
                    {product.name}
                  </div>
                  <div className='mb-1 text-regular-sm'>{product.description}</div>
                  <h3 className='mb-5 font-semibold text-right'>{product.price}</h3>
                  <Button variant='link' className='w-full font-semibold text-center no-underline'>
                    {t('viewThisItem')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
