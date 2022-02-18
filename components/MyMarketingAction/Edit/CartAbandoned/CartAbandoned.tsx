import { RadioGroup } from '@/components/common';
import { Step } from '@/constants';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Steps } from '../Steps';

export const CartAbandoned = () => {
  const { t } = useTranslation('marketingAction');

  const renderStep1 = () => {
    const lineOptions = [
      { value: 'line', label: t('lineOption') },
      { value: 'no-line', label: t('noLine') },
    ];
    return (
      <>
        <div className='font-bold text-gray-dark mb-2.5'>{t('useLine')}</div>
        <RadioGroup>
          {lineOptions.map(option => (
            <RadioGroup.Option
              colorScheme='secondary'
              key={option.value}
              className='mb-2.5 text-gray-dark text-medium'
              label={option.label}
              value={option.value}
            />
          ))}
        </RadioGroup>
      </>
    );
  };

  const renderStep2 = () => {
    // step2
    return null;
  };

  const renderStep3 = () => {
    // step3
    return null;
  };

  const steps: Step[] = [
    {
      name: t('useLine'),
      isDone: true,
      children: renderStep1(),
    },
    {
      name: t('msgSetting1'),
      children: renderStep2(),
    },
    {
      name: t('msgSetting2'),
      children: renderStep3(),
    },
  ];

  return <Steps steps={steps} />;
};
