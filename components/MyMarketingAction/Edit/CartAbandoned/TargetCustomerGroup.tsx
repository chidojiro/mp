import { Form } from '@/components';
import { useTranslation } from 'next-i18next';
import { TargetCustomer } from './TargetCustomer';

export interface TargetCustomer {
  label: string;
  value: string;
}

export const TargetCustomerGroup = () => {
  const { t } = useTranslation('common');
  const { t: tMA } = useTranslation('marketingAction');

  const targetCustomers: TargetCustomer[] = [
    { label: t('f0member'), value: 'f0_member' },
    { label: 'F1', value: t('f1') },
    { label: 'F2', value: t('f2') },
    { label: t('semiRoyal'), value: 'semi_royal' },
    { label: t('royal'), value: 'royal' },
    { label: t('f1dormant'), value: 'f1_dormant' },
    { label: t('royalDormant'), value: 'royal_dormant' },
  ];

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
