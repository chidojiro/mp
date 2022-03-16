import { Icon } from '@/components';
import { Button, Tag } from '@/components/common';
import { HeaderTab } from '@/constants';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  name: string;
  targetCustomers: string[];
  date?: string;
};

export const Action = ({ name, targetCustomers, date }: Props) => {
  const { t } = useTranslation('marketingAction');

  const {
    query: { marketingActionStatus },
  } = useRouter();

  const prefixUrl = '/organizations/1/projects/1/';
  const url =
    marketingActionStatus === HeaderTab.Draft
      ? `actions/edit/${name}`
      : 'reports/policy-report/line-email';

  const btn = marketingActionStatus === HeaderTab.Draft ? t('editInEditor') : t('viewReport');

  return (
    <div className='p-10'>
      <div className='flex items-center'>
        <Icon name='cart' className='w-14 h-14' />
        <h3 className='font-bold ml-7 text-gray-dark'>カゴ落ち通知</h3>
      </div>
      <div className='flex justify-between'>
        <div className='flex-1'>
          <div className='flex mt-4'>
            <span className='mr-2 font-bold text-secondary'>{t('targetCustomer')}</span>
            <div className='flex flex-wrap gap-1'>
              {targetCustomers.map(customer => (
                <Tag key={customer}>{customer}</Tag>
              ))}
            </div>
          </div>
          <div className='mt-5'>
            <span className='font-bold text-secondary'>{t('period')}</span>
            <span className='ml-3 text-gray-dark'>{date}</span>
          </div>
        </div>
      </div>
      <div className='flex justify-center w-full mt-7'>
        <Link passHref href={`${prefixUrl}${url}`}>
          <Button className='w-[360px] h-11'>{btn}</Button>
        </Link>
      </div>
    </div>
  );
};
