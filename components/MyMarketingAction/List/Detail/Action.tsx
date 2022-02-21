import { Button } from '@/components/common';
import { Icon } from '@/components/Icon';
import { HeaderTab } from '@/constants';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Action = () => {
  const { t } = useTranslation('marketingAction');
  const {
    query: { marketingActionStatus },
  } = useRouter();

  const url = '/organizations/1/projects/1/policy-report/line-email';
  const btn = marketingActionStatus === HeaderTab.Draft ? t('editInEditor') : t('policyReport');

  return (
    <div className='p-10'>
      <div className='flex items-center'>
        <Icon name='cart' className='w-14 h-14' />
        <h3 className='font-bold ml-7 text-gray-dark'>カゴ落ち通知</h3>
      </div>
      <div className='flex justify-between'>
        <div className='flex-1'>
          <div className='mt-4'>
            <span className='font-bold text-secondary'>{t('targetCustomer')}</span>
            <span className='px-2 py-1 ml-3 font-semibold text-gray-600 bg-gray-200 rounded-full text-medium-sm'>
              F0(会員)
            </span>
          </div>
          <div className='mt-5'>
            <span className='font-bold text-secondary'>{t('period')}</span>
            <span className='ml-3 text-gray-dark'>2022年12月15日(水) 〜 2022年12月25日(金)</span>
          </div>
        </div>
      </div>
      <div className='flex justify-center w-full mt-7'>
        <Link passHref href={url}>
          <a className='text-white bg-input w-[350px] px-6 py-2 text-center rounded'>{btn}</a>
        </Link>
      </div>
    </div>
  );
};
