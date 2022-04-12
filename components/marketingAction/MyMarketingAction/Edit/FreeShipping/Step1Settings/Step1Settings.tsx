import { useTranslation } from 'next-i18next';

import { Form, RadioGroup } from '@/components/common';
import { Option } from '@/types';

import { TemplateSelector } from '../TemplateSelector';

export const Step1Settings = () => {
  const { t } = useTranslation('marketingAction');
  const unitOptions: Option<string>[] = [
    { label: 'px', value: 'px' },
    { label: '%', value: 'percentage' },
    { label: 'vh', value: 'vh' },
  ];

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
                name='chat_settings.pc_appearance_time'
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
                name='chat_settings.mobile_appearance_time'
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
              <Form.RadioGroup name='chat_settings.pc_display_position'>
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('leftEdge')}
                  value={'left_edge'}
                />
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('rightEdge')}
                  value={'right_edge'}
                />
              </Form.RadioGroup>
              <div className='flex items-center'>
                <span>{t('upFromDefaultPos')}</span>
                <Form.Input
                  type='number'
                  className='w-20 mx-2.5'
                  name='chat_settings.pc_position'
                />
                <Form.Select options={unitOptions} className='w-20' name='chat_settings.pc_unit' />
              </div>
            </div>
          </div>
          <div className='flex mb-2'>
            <span className='w-20'>{t('mobile')}</span>
            <div>
              <Form.RadioGroup name='chat_settings.mobile_display_position'>
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('leftEdge')}
                  value={'left_edge'}
                />
                <RadioGroup.Option
                  colorScheme='secondary'
                  className='mb-2.5'
                  label={t('rightEdge')}
                  value={'right_edge'}
                />
              </Form.RadioGroup>
              <div className='flex items-center'>
                <span>{t('upFromDefaultPos')}</span>
                <Form.Input
                  type='number'
                  className='w-20 mx-2.5'
                  name='chat_settings.mobile_position'
                />
                <Form.Select
                  options={unitOptions}
                  className='w-20'
                  name='chat_settings.mobile_unit'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
