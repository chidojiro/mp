import React from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Layout, RadioGroup } from '@/components';
import { Option } from '@/types';

import { TargetFilter } from '../TargetFilter';
import { RadioTag } from './RadioTag';
import { ReportsTable } from './ReportsTable';

type ReportListPageSlug = 'line-email' | 'chatbot' | 'popup';

export const reportListPageSlugs: ReportListPageSlug[] = ['chatbot', 'line-email', 'popup'];

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const ReportList = ({}: Props) => {
  const { t } = useTranslation('report');
  const { query } = useRouter();

  const actionTypeOptions = React.useMemo<Option<ReportListPageSlug>[]>(
    () => [
      { label: t('lineEmail'), value: 'line-email' },
      { label: t('chatbot'), value: 'chatbot' },
      { label: t('popUp'), value: 'popup' },
    ],
    [t]
  );

  const actionType = query.actionType as string;

  return (
    <Layout title={t('measureReport')} subTitle={t('list')}>
      <div className='space-y-5'>
        <div className='flex items-center gap-5'>
          <div className='font-bold'>{t('period')}</div>
          <div className='text-gray-800'>2021年12月13日（月）〜2022年01月11日（火）</div>
        </div>
        <TargetFilter />
        <div className='flex items-center gap-8'>
          <div className='font-bold'>{t('actionType')}</div>
          <div className='flex items-center gap-2'>
            <RadioGroup value={actionType}>
              {actionTypeOptions.map(({ value, label }) => (
                <RadioTag value={value} label={label} key={value} />
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
      <ReportsTable actionType={actionType} className='mt-10' />
    </Layout>
  );
};
