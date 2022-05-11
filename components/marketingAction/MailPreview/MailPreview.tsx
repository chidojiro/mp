import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { Button } from '@/components/common';
import { ClassName } from '@/types';

type Props = ClassName & {
  headline?: string;
  body?: string;
  desktop?: boolean;
  showViewShoppingCartButton?: boolean;
  color?: string;
  isOverlay?: boolean;
};

//example test message
const products: any[] = [];
products.push({
  image: '/images/product_example1.png',
  id: 1,
  name: 'ブルーベリーケーキ　6個セット',
  price: '1,200円（税込）',
});
products.push({
  image: '/images/product_example2.png',
  id: 2,
  name: 'マカロン　ローズ　24個セット',
  price: '3,600円（税込）',
});

const btnHeightWithMargin = '65px';

export const MailPreview = ({
  headline,
  body,
  desktop,
  className,
  showViewShoppingCartButton = true,
  color,
  isOverlay,
}: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <div
      className={classNames(
        'rounded bg-white opacity-100 border h-[667px] border-input',
        className,
        desktop ? 'w-full px-10 pr-5 flex justify-center bg-gray-light' : 'w-[335px] p-5 pr-2.5'
      )}
      style={{ height: isOverlay ? `calc(100% - ${btnHeightWithMargin})` : '667px' }}
    >
      <div
        className={classNames('h-full pr-1 overflow-y-auto mp-scroll bg-white', {
          'w-[600px] p-10': desktop,
        })}
      >
        <div className='flex justify-center w-full mb-4'>
          <img
            className={classNames({ 'w-[134px]': !desktop })}
            alt='brand-logo'
            src='/images/brand-logo.png'
          />
        </div>
        <div className='flex justify-center w-full'>
          <h3 className='w-full mb-4 text-center whitespace-pre-line text-gray-dark'>{headline}</h3>
        </div>
        <div className='mb-3 font-semibold'>山田 太郎 様</div>
        <div className='mb-8 break-words whitespace-pre-wrap text-gray-dark'>{body}</div>
        {showViewShoppingCartButton && (
          <div className='w-full text-center'>
            <Button
              className='h-11 max-w-[360px] w-full font-bold text-center mb-[60px]'
              style={{ backgroundColor: color }}
            >
              {t('viewShoppingCart')}
            </Button>
          </div>
        )}
        <div>
          {products.map(product => (
            <div key={product.id} className={classNames('pb-8 border-b mb-7', desktop && 'flex')}>
              <img
                alt=''
                src={product.image}
                className={classNames(
                  'rounded bg-white',
                  !desktop ? 'w-[295px] h-[196px]' : 'mr-[30px] w-[200px] h-[133px]'
                )}
              />
              <div>
                <h5 className='mt-4 mb-2 text-gray-dark'>{product.name}</h5>
                <div className='mb-5 text-medium text-gray-dark'>{product.price}</div>
                <Button className='w-full font-bold text-center' style={{ backgroundColor: color }}>
                  {t('viewThisItem')}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-7'>
          <div className='mt-4 mb-1.5 text-gray-dark'>○○○ストア</div>
          <Link href='https://www.google.com/'>
            <a className='underline text-medium' style={{ color: color }}>
              www.sample.com
            </a>
          </Link>
          <div className='mt-1 text-medium text-gray-dark'>0123-45-6789（平日 9:00〜18:00）</div>
        </div>
      </div>
    </div>
  );
};
