import { Layout, Tabs } from '@/components';
import { MarketingActionStatus as MAStatus } from '@/types';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Draft } from './Draft';
import { End } from './End';
import { InProgress } from './InProgress';

export const List = () => {
  const { t } = useTranslation(['marketingAction']);
  const { pathname, query } = useRouter();

  const tabs = [
    {
      value: MAStatus.RUNNING,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: { ...query, marketingActionStatus: MAStatus.RUNNING, marketingActionId: 1 },
          }}
        >
          <a className='block'>{t('inProgressTab')}</a>
        </Link>
      ),
      content: <InProgress />,
    },
    {
      value: MAStatus.COMPLETE,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: { ...query, marketingActionStatus: MAStatus.COMPLETE, marketingActionId: 1 },
          }}
        >
          <a className='block'>{t('finishedTab')}</a>
        </Link>
      ),
      content: <End />,
    },
    {
      value: MAStatus.DRAFT,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: { ...query, marketingActionStatus: MAStatus.DRAFT, marketingActionId: 1 },
          }}
        >
          <a className='block'>{t('draftTab')}</a>
        </Link>
      ),

      content: <Draft />,
    },
  ];
  return (
    <Layout title={t('menuMyMarketingAction')}>
      <div className='flex h-full'>
        <Tabs
          className='w-full h-full'
          items={tabs}
          value={query.marketingActionStatus as string}
        />
      </div>
    </Layout>
  );
};
