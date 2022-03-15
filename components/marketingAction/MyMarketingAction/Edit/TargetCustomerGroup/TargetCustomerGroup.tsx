import { Form } from '@/components';
import { Option } from '@/types';
import { useTranslation } from 'next-i18next';
import { TargetCustomer } from './TargetCustomer';

type Props = {
  isNonMember?: boolean;
};

export const TargetCustomerGroup = ({ isNonMember }: Props) => {
  const { t } = useTranslation('common');
  const { t: tMA } = useTranslation('marketingAction');

  const customers: Option<string>[] = [
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
      const _customers = [...customers];
      _customers.splice(1, 0, {
        label: t('f0NonMember'),
        value: 'f0_non_memeber',
      });
      return _customers;
    }
    return customers;
  })();

  return (
    <div>
      <div className='font-bold text-gray-dark mb-2.5'>{tMA('targetCustomer')}</div>
      <div className='grid grid-cols-4'>
        <Form.CheckboxGroup name='target_customers'>
          {targetCustomers.map(option => (
            <TargetCustomer key={option.value} option={option} />
          ))}
        </Form.CheckboxGroup>
      </div>
    </div>
  );
};
