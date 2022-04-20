import React, { useEffect, useState } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { Layout } from '@/components/Layout';
import { Tabs } from '@/components/common/Tabs';
import { MarketingActionStatus as MAStatus } from '@/types';
import { Detail } from '@/components/marketingAction/View';
import { MarketingActionAPI } from '@/apis';
import { TargetFilterUtils } from '@/utils';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'marketingAction', 'report'])),
  },
});

export const ListActionPage = () => {
  const { t } = useTranslation(['marketingAction']);
  const { pathname, query } = useRouter();

  const [filter, setFilter] = useState({});

  useEffect(() => {
    const _targets = [query.targets].flat().filter(Boolean);
    if (_targets && _targets[0] !== 'all') {
      const _targetSegments = TargetFilterUtils.getTargetCustomers(_targets as string[]);
      setFilter(prevState => {
        return { ...prevState, target_segments: JSON.stringify(_targetSegments) };
      });
    }
  }, [query.targets]);

  const { data, mutate } = useSWR(
    ['/actions', filter],
    () => MarketingActionAPI.list({ params: filter }),
    {
      fallbackData: {},
    }
  );

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
          <a className='block'>
            {t('inProgressTab')} ({data?.[MAStatus.RUNNING]?.length})
          </a>
        </Link>
      ),
      content: (
        <Detail marketingActions={data?.[MAStatus.RUNNING]} mutateMarketingActions={mutate} />
      ),
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
          <a className='block'>
            {t('finishedTab')} ({data?.[MAStatus.COMPLETE]?.length})
          </a>
        </Link>
      ),
      content: (
        <Detail marketingActions={data?.[MAStatus.COMPLETE]} mutateMarketingActions={mutate} />
      ),
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
          <a className='block'>
            {t('draftTab')} ({data?.[MAStatus.DRAFT]?.length})
          </a>
        </Link>
      ),

      content: <Detail marketingActions={data?.[MAStatus.DRAFT]} mutateMarketingActions={mutate} />,
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

function MyMarketingActionPage() {
  return <ListActionPage />;
}

export default MyMarketingActionPage;
