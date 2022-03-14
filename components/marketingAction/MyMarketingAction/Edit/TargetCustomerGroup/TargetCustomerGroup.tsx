import { Form } from '@/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { TargetCustomer } from './TargetCustomer';

export interface TargetCustomer {
  label: string;
  value: string;
}

type Props = {
  isNonMember?: boolean;
};

export const TargetCustomerGroup = ({ isNonMember }: Props) => {
  const { t } = useTranslation('common');
  const { t: tMA } = useTranslation('marketingAction');

  const customers: TargetCustomer[] = [
    { label: t('f0member'), value: 'f0_member' },
    { label: 'F1', value: 'f1' },
    { label: 'F2', value: 'f2' },
    { label: t('semiLoyal'), value: 'semi_loyal' },
    { label: t('loyal'), value: 'loyal' },
    { label: t('f1dormant'), value: 'f1_dormant' },
    { label: t('loyalDormant'), value: 'loyal_dormant' },
  ];

  const targetCustomers = (() => {
    if (isNonMember) {
      customers.splice(1, 0, {
        label: t('f0NonMember'),
        value: 'f0_non_memeber',
      });
    }
    return customers;
  })();

  return (
    <div>
      <div className='font-bold text-gray-dark mb-2.5'>{tMA('targetCustomer')}</div>
      <div className='grid grid-cols-4'>
        <Form.CheckboxGroup name='target_customers'>
          {targetCustomers.map(option => (
            <TargetCustomer key={option.value} label={option.label} value={option.value} />
          ))}
        </Form.CheckboxGroup>
      </div>
    </div>
  );
};
