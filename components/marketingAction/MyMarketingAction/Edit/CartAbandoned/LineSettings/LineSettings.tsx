import { Form, RadioGroup } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { OPTIONS } from '../CartAbandoned';

export const LineSettings = () => {
  const { t } = useTranslation('marketingAction');
  const lineOptions = [
    { value: OPTIONS.YES, label: t('lineOption') },
    { value: OPTIONS.NO, label: t('noLine') },
  ];

  return (
    <>
      <div className='font-bold text-gray-dark mb-2.5'>{t('useLine')}</div>
      <Form.RadioGroup name='is_use_line'>
        {lineOptions.map(option => (
          <RadioGroup.Option
            colorScheme='secondary'
            key={option.value}
            className='mb-2.5 text-gray-dark text-medium'
            label={option.label}
            value={option.value}
          />
        ))}
      </Form.RadioGroup>
    </>
  );
};