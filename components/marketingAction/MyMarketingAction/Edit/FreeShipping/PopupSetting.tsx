// import { Form, Icon } from '@/components';
import { Form, RadioGroup } from '@/components/common';
import { Radio } from '@/components/common/fields/Radio/Radio';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { TemplateSelector } from './TemplateSelector';

type Props = {
  testProp?: string;
};

export const PopupSetting = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  const measurementTypes: any = {
    px: 'px',
    percent: '%',
    vh: 'vh',
  };

  const getSelectBox = (device: string) => {
    const selectBox = Object.keys(measurementTypes).map((optionItem: any) => {
      return { value: optionItem, label: measurementTypes[optionItem] };
    });

    return (
      <Form.Select
        defaultValue={selectBox[0].value}
        options={selectBox}
        name={'measurement-select-' + device}
        className='w-20 mx-2'
      />
    );
  };

  return (
    <>
      <div className='px-10 -mx-10 border-b-4 border-white pb-7'>
        <div className='mb-2 font-semibold'>{t('templateSelection')}</div>
        <div className='mb-4 text-medium'>
          ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。
        </div>
        <TemplateSelector preselectedTemplate='template1' />
      </div>

      <div className='px-10 -mx-10 border-b-4 border-white pb-7 mt-[40px]'>
        <div className='mb-2 font-semibold'>{t('freeShippingAmountLabel')}</div>
        <div className='flex items-center'>
          <Form.Input type='number' name={'freeShippingCost'} className='w-20' />
          <span className=' mx-2.5'>{t('freeShippingPriceEndLabel')}</span>
        </div>
      </div>

      <div className='px-10 -mx-10 border-white mt-[40px]'>
        <div className='mb-2 font-semibold'>{t('conditionLabel')}</div>
        <div className='mb-16 text-medium'>{t('conditionSubtext')}</div>

        <div className='mb-5'>
          <div className='text-secondary'>{t('appearanceTiming')}</div>
          <div className='flex items-center my-2.5'>
            <span className='w-20 mr-10'>PC：</span>
            <span>{t('afterOpeningPage')}</span>
            <Form.Input type='number' name={'pcOpenSetting'} className='w-20 mx-2' />
            <span>{t('secondsUntilOpens')}</span>
          </div>
          <div className='flex items-center my-2.5'>
            <span className='w-20 mr-10'>{t('mobile')}：</span>
            <span>{t('afterOpeningPage')}</span>
            <Form.Input type='number' name={'mobileOpenSetting'} className='w-20 mx-2' />
            <span>{t('secondsUntilOpens')}</span>
          </div>
        </div>

        <div className=''>
          <div className='text-secondary'>{t('indicatesLocation')}</div>
          <div className='flex items-start'>
            <span className='w-20 mr-10 my-2.5'>PC：</span>
            <div className='flex-col'>
              <Form.RadioGroup name='pc-position'>
                <RadioGroup.Option
                  colorScheme='secondary'
                  key='pc-left'
                  className='mt-2.5 mr-2.5 mb-2.5 text-gray-dark text-regular'
                  label={t('screenLeft')}
                  value='left'
                />
                <RadioGroup.Option
                  colorScheme='secondary'
                  key='pc-right'
                  className='mr-2.5 mb-2.5 text-gray-dark text-regular'
                  label={t('screenRight')}
                  value='right'
                />
              </Form.RadioGroup>
            </div>
          </div>
          <div className='flex items-start'>
            <span className='w-20 mr-10 my-2.5'></span>
            <div className='flex items-center'>
              <span>{t('upFromDefaultPosition')}</span>
              <Form.Input type='number' name={'pcDefaultPosition'} className='w-20 mx-2' />
              <div className='mx-2.5'>{getSelectBox('pc')}</div>
            </div>
          </div>
          <div className='flex items-start'>
            <span className='w-20 mr-10 my-2.5'>{t('mobile')}：</span>
            <div className='flex-col'>
              <Form.RadioGroup name='mobile-position'>
                <RadioGroup.Option
                  colorScheme='secondary'
                  key='mobile-left'
                  className='mt-2.5 mr-2.5 mb-2.5 text-gray-dark text-regular'
                  label={t('screenLeft')}
                  value='left'
                />
                <RadioGroup.Option
                  colorScheme='secondary'
                  key='mobile-right'
                  className='mr-2.5 mb-2.5 text-gray-dark text-regular'
                  label={t('screenRight')}
                  value='right'
                />
              </Form.RadioGroup>
            </div>
          </div>
          <div className='flex items-start'>
            <span className='w-20 mr-10 my-2.5'></span>
            <div className='flex items-center'>
              <span>{t('upFromDefaultPosition')}</span>
              <Form.Input type='number' name={'mobileDefaultPosition'} className='w-20 mx-2' />
              <div className='mx-2.5'>{getSelectBox('mobile')}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
