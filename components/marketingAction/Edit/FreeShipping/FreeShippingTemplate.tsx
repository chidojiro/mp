import React from 'react';
import { useTranslation } from 'next-i18next';

import { Icon } from '@/components/common';

type Props = {
  templateSelection: string;
  freeShippingCost?: string;
  remainingCost?: string;
};

export const FreeShippingTemplate = ({
  templateSelection,
  freeShippingCost,
  remainingCost,
}: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      {templateSelection !== 'template2' ? (
        <div className='h-[240px] w-[240px] min-h-[128px] min-w-[128px] bg-primary flex flex-col items-center justify-center text-white relative'>
          <div className='text-[20px]'>{t('shippingTemplateOneUntilFree')}</div>
          <div className='flex items-baseline mb-3'>
            <div className='text-[18px]'>{t('shippingTemplateAfter')}</div>
            <div className='text-[36px] text-[#FFF500] m-1 font-bold'>
              {remainingCost
                ? remainingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '1,520'}
            </div>
            <div className='text-[18px] text-[#FFF500]'>{t('yenMarker')}</div>
          </div>
          <hr className='border-white border-t border-solid h-[1px] w-[80%] mb-1' />
          <div className='text-[14px]'>
            {freeShippingCost
              ? freeShippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : '5,000'}
            {t('shippingTemplateOneThresholdUntilFree')}
          </div>
          <hr className='border-white border-t border-solid h-[1px] w-[80%] mt-1' />
          <div className='justify-center top-[-10px] right-[-10px] absolute bg-white text-primary rounded-full p-[2px] h-5 w-5 flex items-center border-2 border-solid border-primary'>
            <Icon name='close' />
          </div>
        </div>
      ) : (
        <div className='h-[240px] w-[240px] min-h-[128px] min-w-[128px] bg-secondary flex flex-col items-center justify-center text-white relative'>
          <div className='flex items-baseline'>
            <div className='text-[18px]'>{t('shippingTemplateAfter')}</div>
            <div className='text-[36px] text-[#E34216] m-1 font-bold'>
              {remainingCost
                ? remainingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '1,520'}
            </div>
            <div className='text-[18px] text-[#E34216]'>{t('yenMarker')}</div>
          </div>
          <div className='flex flex-col items-center mb-3'>
            <div className='text-[16px]'>{t('shippingTemplateWithPurchaseOf')}</div>
            <div className='text-[16px]'>{t('shippingTemplateTwoFreeShipping')}</div>
          </div>
          <div className='flex flex-col items-center relative'>
            <div className='absolute top-[0px] left-[-30px] h-[50px] w-[50px]'>
              <Icon name='free-shipping-template-path' size={36} />
            </div>
            <div className='text-[12px]'>
              {freeShippingCost
                ? freeShippingCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '5,000'}
              {t('shippingTemplateTwoThresholdUntilFree')}
            </div>
            <div className='text-[12px]'>{t('shippingTemplateTwoFreeShippingCampaing')}</div>
            <div className='absolute top-[-14px] right-[-30px] h-[50px] w-[50px] rotate-180'>
              <Icon name='free-shipping-template-path' size={36} />
            </div>
          </div>
          <div className='justify-center top-[-10px] right-[-10px] absolute bg-white text-secondary rounded-full p-[2px] h-5 w-5 flex items-center border-2 border-solid border-secondary'>
            <Icon name='close' />
          </div>
        </div>
      )}
    </>
  );
};
