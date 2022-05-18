import { Tabs } from '@/common/Tabs';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { Detail } from '@/marketing-action-view';
import { MarketingActionApis } from '@/marketing-action/apis';
import { MarketingActionStatus } from '@/marketing-action/types';
import { MarketingActionUtils } from '@/marketing-action/utils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

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
      const _targetSegments = MarketingActionUtils.getTargetCustomers(_targets as string[]);
      setFilter(prevState => {
        return { ...prevState, target_segments: JSON.stringify(_targetSegments) };
      });
    }
  }, [query.targets]);

  const { data, mutate } = useSWR(
    ['/actions', filter],
    () => MarketingActionApis.list({ params: filter }),
    {
      fallbackData: {},
    }
  );

  const handleChangePeriod = (dates: string[]) => {
    if (dates.length) {
      setFilter(prevState => {
        return { ...prevState, start_from: dates[0], start_to: dates[1] };
      });
    } else {
      const { start_from, start_to, ...rest } = filter as any;
      setFilter(rest);
    }
  };

  const tabs = [
    {
      value: MarketingActionStatus.RUNNING,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: {
              ...query,
              marketingActionStatus: MarketingActionStatus.RUNNING,
              marketingActionId: 1,
            },
          }}
        >
          <a className='block'>
            {t('inProgressTab')} ({data?.[MarketingActionStatus.RUNNING]?.length})
          </a>
        </Link>
      ),
      content: (
        <Detail
          marketingActions={data?.[MarketingActionStatus.RUNNING]}
          mutateMarketingActions={mutate}
          onChangePeriod={handleChangePeriod}
        />
      ),
    },
    {
      value: MarketingActionStatus.COMPLETE,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: {
              ...query,
              marketingActionStatus: MarketingActionStatus.COMPLETE,
              marketingActionId: 1,
            },
          }}
        >
          <a className='block'>
            {t('finishedTab')} ({data?.[MarketingActionStatus.COMPLETE]?.length})
          </a>
        </Link>
      ),
      content: (
        <Detail
          marketingActions={data?.[MarketingActionStatus.COMPLETE]}
          mutateMarketingActions={mutate}
          onChangePeriod={handleChangePeriod}
        />
      ),
    },
    {
      value: MarketingActionStatus.DRAFT,
      label: (
        <Link
          passHref
          href={{
            pathname,
            query: {
              ...query,
              marketingActionStatus: MarketingActionStatus.DRAFT,
              marketingActionId: 1,
            },
          }}
        >
          <a className='block'>
            {t('draftTab')} ({data?.[MarketingActionStatus.DRAFT]?.length})
          </a>
        </Link>
      ),

      content: (
        <Detail
          marketingActions={data?.[MarketingActionStatus.DRAFT]}
          mutateMarketingActions={mutate}
          onChangePeriod={handleChangePeriod}
        />
      ),
    },
  ];
  return (
    <PrivateLayout title={t('menuMyMarketingAction')}>
      <div className='flex h-full'>
        <Tabs
          className='w-full h-full'
          items={tabs}
          value={query.marketingActionStatus as string}
        />
      </div>
    </PrivateLayout>
  );
};

function MyMarketingActionPage() {
  return <ListActionPage />;
}

export default MyMarketingActionPage;
