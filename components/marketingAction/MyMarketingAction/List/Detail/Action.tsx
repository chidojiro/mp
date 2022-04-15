import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, IconName, Icon, Tag } from '@/components/common';
import { MarketingActionStatus as MAStatus, TargetSegment } from '@/types';
import { TargetFilterUtils } from '@/utils';

type Props = {
  path: string;
  name: string;
  icon: IconName;
  targetCustomers: TargetSegment[];
  date?: string;
};

export const Action = ({ name, path, icon, targetCustomers, date }: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation('common');

  const {
    query: { marketingActionStatus, marketingActionId },
  } = useRouter();

  const prefixUrl = '/organizations/1/projects/1/';
  const url =
    marketingActionStatus === MAStatus.DRAFT
      ? `actions/edit/${path}/${marketingActionId}`
      : 'reports/action-reports/line-email/1?targets=all';

  const btn = marketingActionStatus === MAStatus.DRAFT ? t('editInEditor') : t('viewReport');
  const targetFilters = TargetFilterUtils.getTargetFilters(targetCustomers);
  return (
    <div className='p-10'>
      <div className='flex items-center'>
        <Icon name={icon} className='w-14 h-14' />
        <h3 className='font-bold ml-7 text-gray-dark'>{name}</h3>
      </div>
      <div className='flex justify-between'>
        <div className='flex-1'>
          <div className='flex mt-4'>
            <span className='mr-2 font-bold text-secondary'>{t('targetCustomer')}</span>
            <div className='flex flex-wrap gap-1'>
              {targetFilters.map((target, index) => (
                <Tag key={index}>{tCommon(target)}</Tag>
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
