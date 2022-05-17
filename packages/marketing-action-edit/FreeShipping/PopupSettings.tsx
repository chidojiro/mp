import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import { Form } from '@/common/Form';
import { RadioGroup } from '@/common/RadioGroup';
import { Option } from '@/common/types';

import { TemplateSelector } from './TemplateSelector';

type Props = {
  passData: any;
  passTemplateSelection: any;
};

export const PopupSettings = ({ passData, passTemplateSelection }: Props) => {
  const [freeShipInput, setFreeShipInput] = useState('5000');
  const { t } = useTranslation('marketingAction');
  const unitOptions: Option<string>[] = [
    { label: 'px', value: 'px' },
    { label: '%', value: '%' },
    { label: 'vh', value: 'vh' },
  ];

  const getInputData = ({ target }: any) => {
    setFreeShipInput(target.value);
  };

  return (
    <>
      <div className='px-10 -mx-10 border-b-4 border-white pb-7'>
        <div className='mb-2 font-semibold'>{t('templateSelection')}</div>
        <div className='mb-4 text-medium'>
          ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。
        </div>
        <TemplateSelector passTemplateSelection={passTemplateSelection} />
      </div>

      <div className='px-10 -mx-10 border-b-4 border-white pb-7 mt-[40px]'>
        <div className='mb-2 font-semibold'>{t('freeShippingAmountLabel')}</div>
        <div className='flex items-center'>
          <Form.Input
            type='number'
            name='free_shipping_amount'
            className='w-20'
            value={freeShipInput}
            onInput={getInputData}
            onChange={passData(freeShipInput)}
          />
          <span className=' mx-2.5'>{t('freeShippingPriceEndLabel')}</span>
        </div>
      </div>

      <div className='pt-5'>
        <div className='mb-2 font-bold text-gray-dark'>{t('appearanceCond')}</div>
        <div className='text-gray-700 mb-14 text-medium'>{t('appearanceCondDesc')}</div>
        <div className='mb-3 text-medium text-gray-dark'>
          <div className='mb-2 font-bold text-secondary'>{t('appearanceTiming')}</div>
          <div className='flex items-center mb-2'>
            <span className='w-20'>PC:</span>
            <div className='flex items-center'>
              <div>{t('afterOpening')}</div>
              <Form.Input
                type='number'
                className='w-20 mx-2.5'
                name='display_settings_pc.appear_time'
              />
              <span>{t('secondsAfterAprearance')}</span>
            </div>
          </div>
          <div className='flex items-center'>
            <span className='w-20'>{t('mobile')}:</span>
            <div className='flex items-center'>
              <div>{t('afterOpening')}</div>
              <Form.Input
                type='number'
                className='w-20 mx-2.5'
                name='display_settings_mobile.appear_time'
              />
              <span>{t('secondsAfterAprearance')}</span>
            </div>
          </div>
        </div>
        <div className='mb-3 text-medium text-gray-dark'>
          <div className='mb-2 font-bold text-secondary'>{t('displayPos')}</div>
          <div className='flex mb-2'>
            <span className='w-20'>PC:</span>
            <div>
              <Form.RadioGroup name='display_settings_pc.position'>
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('leftEdge')}
                  value={'left'}
                />
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('rightEdge')}
                  value={'right'}
                />
              </Form.RadioGroup>
              <div className='flex items-center'>
                <span>{t('upFromDefaultPos')}</span>
                <Form.Input
                  type='number'
                  className='w-20 mx-2.5'
                  name='display_settings_pc.position_close_box'
                />
                <Form.Select
                  options={unitOptions}
                  className='w-20'
                  name='display_settings_pc.position_close_box_unit'
                />
              </div>
            </div>
          </div>
          <div className='flex mb-2'>
            <span className='w-20'>{t('mobile')}</span>
            <div>
              <Form.RadioGroup name='display_settings_mobile.position'>
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('leftEdge')}
                  value={'left'}
                />
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('rightEdge')}
                  value={'right'}
                />
              </Form.RadioGroup>
              <div className='flex items-center'>
                <span>{t('upFromDefaultPos')}</span>
                <Form.Input
                  type='number'
                  className='w-20 mx-2.5'
                  name='display_settings_mobile.position_close_box'
                />
                <Form.Select
                  options={unitOptions}
                  className='w-20'
                  name='display_settings_mobile.position_close_box_unit'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
