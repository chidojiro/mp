import { useTranslation } from 'next-i18next';

import { Form, RadioGroup } from '@/components/common';

export const Step1Settings = () => {
  const { t } = useTranslation('marketingAction');
  const aggregationPeriodOptions = [
    { value: '1Month', label: t('1Month') },
    { value: '1Week', label: t('1Week') },
  ];

  return (
    <>
      <div className='font-bold text-gray-dark mb-2.5'>{t('aggregationPeriod')}</div>
      <Form.RadioGroup name='aggregation_period'>
        {aggregationPeriodOptions.map(option => (
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
