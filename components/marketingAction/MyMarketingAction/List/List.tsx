import { Layout, Tabs } from '@/components';
import { HeaderTab } from '@/constants';
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
      value: HeaderTab.Active,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: { ...query, marketingActionStatus: HeaderTab.Active, marketingActionId: 1 },
          }}>
          <a className='block'>{t('inProgressTab')}</a>
        </Link>
      ),
      content: <InProgress />,
    },
    {
      value: HeaderTab.Terminated,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: { ...query, marketingActionStatus: HeaderTab.Terminated, marketingActionId: 1 },
          }}>
          <a className='block'>{t('finishedTab')}</a>
        </Link>
      ),
      content: <End />,
    },
    {
      value: HeaderTab.Draft,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: { ...query, marketingActionStatus: HeaderTab.Draft, marketingActionId: 1 },
          }}>
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
