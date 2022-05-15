import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { Button } from '@/common/Button';
import { getVariableContentPreview } from '@/marketing-action-edit/utils';
import { AspectRatio } from '@/headless';
import { MarketingActionAlias } from '@/marketing-action/types';
import { useVariables } from '@/marketing-action/useVariables';

type Props = {
  body?: string;
  desktop?: boolean;
  isOverlay?: boolean;
  headline?: string;
  marketingAction?: MarketingActionAlias;
  imageRatio?: string;
};

//example test message
const products: any[] = [];
products.push({
  image: '/images/product_example1.png',
  id: 1,
});
products.push({
  image: '/images/product_example2.png',
  id: 2,
});

const btnHeightWithMargin = '85px';

export const LinePreview = ({
  body,
  isOverlay = false,
  headline,
  marketingAction,
  imageRatio = '3:2',
}: Props) => {
  const { t } = useTranslation('marketingAction');

  const { data: variables } = useVariables();

  const bodyPreview = getVariableContentPreview(body ?? '', variables);
  const headlinePreview = getVariableContentPreview(headline ?? '', variables);

  return (
    <div
      className={classNames(
        'rounded bg-[#95A6C9] opacity-100 border border-input w-[335px] py-4 px-1.5'
      )}
      style={{ height: isOverlay ? `calc(100% - ${btnHeightWithMargin})` : '667px' }}
    >
      <div className='w-full h-full overflow-auto mp-scroll'>
        {!!bodyPreview && (
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
                {bodyPreview}
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
                className='flex-none relative w-[254px] bg-white mr-2 border-2 h-fit rounded-lg border-dashed border-secondary'
              >
                <AspectRatio ratio={imageRatio.replace(/:/g, '-') as any}>
                  <img alt='' src={product.image} className='rounded-t-lg w-full h-full' />
                </AspectRatio>
                <div className='p-3.5 text-gray-dark'>
                  <div className='w-full font-semibold mb-2 text-gray-dark text-[22px]'>
                    {headlinePreview}
                  </div>
                  <Button
                    variant='link'
                    className={classNames(
                      'w-full font-semibold text-center no-underline font-[normal]',
                      {
                        'text-[#6490cb]': marketingAction === MarketingActionAlias.AFTER_PURCHASE,
                      }
                    )}
                  >
                    {marketingAction === MarketingActionAlias.CART_LEFT_NOTIFICATION
                      ? t('viewShoppingCart')
                      : t('viewThisItem')}
                  </Button>
                </div>
                <div className='absolute top-[10px] left-[12px] px-2 py-1 rounded-full text-medium text-white bg-secondary'>
                  {t('productAutoInserted')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
