import { useTranslation } from 'next-i18next';
import { Form } from '@/components';
import { Option, TARGET } from '@/types';
import { TargetCustomer } from './TargetCustomer';

type Props = {
  isNonMember?: boolean;
};

export const TargetCustomerGroup = ({ isNonMember }: Props) => {
  const { t } = useTranslation('common');
  const { t: tMA } = useTranslation('marketingAction');

  const customers: Option<string>[] = [
    { label: t('f0member'), value: TARGET.F0_MEMBER },
    { label: 'F1', value: TARGET.F1 },
    { label: 'F2', value: TARGET.F2 },
    { label: t('semiLoyal'), value: TARGET.SEMI_LOYAL },
    { label: t('loyal'), value: TARGET.LOYAL },
    { label: t('f1dormant'), value: TARGET.F1_DORMANT },
    { label: t('loyalDormant'), value: TARGET.LOYAL_DORMANT },
    { label: t('otherDormant'), value: TARGET.OTHER_DORMANT },
  ];

  const targetCustomers = (() => {
    if (isNonMember) {
      return [
        customers[0],
        {
          label: t('f0others'),
          value: 'f0others',
        },
        ...customers.slice(1),
      ];
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
