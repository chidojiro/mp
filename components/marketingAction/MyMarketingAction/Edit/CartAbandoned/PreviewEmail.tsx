import { Button } from '@/components/common';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';

type Props = {
  headline: string;
  body: string;
  showMobileVersion?: boolean;
  isPreview?: boolean;
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
    price: '1,200円（税込）',
  });
}

export const PreviewEmail = ({
  headline,
  body,
  showMobileVersion,
  isPreview,
  className,
}: Props) => {
  const { t } = useTranslation('marketingAction');
  return (
    <div
      className={classNames(
        'rounded bg-white opacity-100 h-fit border border-input h-[667px]',
        className,
        showMobileVersion ? 'w-[335px] p-5' : 'w-[600px] p-10',
        { 'pr-2.5': !isPreview }
      )}
    >
      <div className={classNames('h-full pr-1', { 'overflow-y-scroll mp-scroll': !isPreview })}>
        <h2 className='mb-4 text-center text-secondary'>Brand Logo</h2>
        <div className='flex justify-center w-full'>
          <h3 className='w-[160px] mb-4 whitespace-pre-line text-gray-dark text-center'>
            {headline}
          </h3>
        </div>
        <div className='mb-3 font-semibold'>山田 太郎 様</div>
        <div className='mb-3 text-gray-dark'>{body}</div>
        <div className='w-full text-center'>
          <Button className=' h-11 max-w-[360px] w-full font-bold text-center'>
            {t('viewShoppingCart')}
          </Button>
        </div>
        <div className='mt-[60px]'>
          {products.map(product => (
            <div
              key={product.id}
              className={classNames('pb-8 border-b mb-7', { flex: !showMobileVersion })}
            >
              <img
                src={product.image}
                className={classNames(
                  'rounded bg-white',
                  showMobileVersion ? 'w-[295px] h-[196px]' : 'mr-[30px] w-[200px] h-[133px]'
                )}
              />
              <div>
                <h5 className='mt-4 mb-2 text-gray-dark'>{product.name}</h5>
                <div className='mb-5 text-medium text-gray-dark'>{product.price}</div>
                <Button className='w-full font-bold text-center'>{t('viewThisItem')}</Button>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-7'>
          <div className='mt-4 mb-1.5 text-gray-dark'>○○○ストア</div>
          <Link href='https://www.google.com/'>
            <a className='underline text-medium text-primary'>www.sample.com</a>
          </Link>
          <div className='mt-1 text-medium text-gray-dark'>0123-45-6789（平日 9:00〜18:00）</div>
        </div>
      </div>
    </div>
  );
};
