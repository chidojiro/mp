import React from 'react';

import { ChevronRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Layout } from '@/components/Layout';
import { TargetFilter } from '@/components/TargetFilter';
import { useProfile } from '@/hooks';

import { ReportTable } from './ReportTable';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const ReportDetails = ({}: Props) => {
  const { t } = useTranslation('report');
  const profile = useProfile();
  return (
    <Layout title={t('measureReport')} subTitle={t('cartAbandoned')}>
      <div className='space-y-5'>
        <div className='flex items-center gap-5'>
          <div className='font-bold'>{t('period')}</div>
          <div className='text-gray-800'>2021年12月13日（月）〜2022年01月11日（火）</div>
        </div>
        <TargetFilter />
      </div>
      <ReportTable className='mt-10' />
      <Link
        passHref
        href={`/organizations/${profile.data?.organization_id}/projects/${profile.data?.project_id}/reports/action-reports/line-email?targets=all`}
      >
        <a className='flex justify-end mt-5'>
          <div className='flex items-center text-gray-600 transform translate-x-2'>
            {t('returnToList')}
            <ChevronRightIcon
              scale={12}
              className='text-secondary'
              width={28}
              height={28}
              aria-hidden='true'
            />
          </div>
        </a>
      </Link>
    </Layout>
  );
};
