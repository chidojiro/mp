import { Form, RadioGroup } from '@/components/common';
import { useTranslation } from 'next-i18next';

export const AppearanceCond = () => {
  const { t } = useTranslation('marketingAction');
  const unitOptions = [
    { label: 'px', value: 'px' },
    { label: '%', value: 'percentage' },
    { label: 'vh', value: 'vh' },
  ];

  return (
    <div className='pt-5'>
      <div className='mb-2 font-bold text-gray-dark'>{t('appearanceCond')}</div>
      <div className='text-gray-700 mb-14 text-medium'>{t('appearanceCondDesc')}</div>
      <div className='mb-3 text-medium text-gray-dark'>
        <div className='mb-2 font-bold text-secondary'>{t('appearanceTiming')}</div>
        <div className='flex items-center mb-2'>
          <span className='w-20'>PC:</span>
          <div className='flex items-center'>
            <div>{t('afterOpening')}</div>
            <Form.Input type='number' className='w-20 mx-2.5' name='step3.pc_appearance_time' />
            <span>{t('secondsAfterAprearance')}</span>
          </div>
        </div>
        <div className='flex items-center'>
          <span className='w-20'>{t('mobile')}:</span>
          <div className='flex items-center'>
            <div>{t('afterOpening')}</div>
            <Form.Input type='number' className='w-20 mx-2.5' name='step3.mobile_appearance_time' />
            <span>{t('secondsAfterAprearance')}</span>
          </div>
        </div>
      </div>
      <div className='mb-3 text-medium text-gray-dark'>
        <div className='mb-2 font-bold text-secondary'>{t('displayPos')}</div>
        <div className='flex mb-2'>
          <span className='w-20'>PC:</span>
          <div>
            <Form.RadioGroup name='step3.pc_display_position'>
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
              <Form.Input type='number' className='w-20 mx-2.5' name='step3.pc_position' />
              <Form.Select options={unitOptions} className='w-20' name='step3.pc_unit' />
            </div>
          </div>
        </div>
        <div className='flex mb-2'>
          <span className='w-20'>{t('mobile')}</span>
          <div>
            <Form.RadioGroup name='step3.mobile_display_position'>
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
              <Form.Input type='number' className='w-20 mx-2.5' name='step3.mobile_position' />
              <Form.Select options={unitOptions} className='w-20' name='step3.mobile_unit' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
