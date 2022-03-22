import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { TargetFilter } from '../TargetFilter';
import { ReportTable } from './ReportTable';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const ReportDetails = ({}: Props) => {
  const { t } = useTranslation('report');

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
    </Layout>
  );
};
