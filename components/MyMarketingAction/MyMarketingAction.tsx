import { HeaderTab } from '@/constants';
import { UriUtils } from '@/utils';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Layout, Tabs } from '../common';
import { Draft } from './Draft';
import { End } from './End';
import { InProgress } from './InProgress';

export const MyMarketingAction = () => {
  const { t } = useTranslation(['myMarketingAction']);

  const {
    query: { marketingActionStatus },
  } = useRouter();

  const tabs = [
    {
      value: HeaderTab.InProgress,
      label: (
        <Link passHref href={UriUtils.replace(['in-progress'])}>
          <a className='block'>{t('inProgressTab')}</a>
        </Link>
      ),
      content: <InProgress />,
    },
    {
      value: HeaderTab.Ended,
      label: (
        <Link passHref href={UriUtils.replace(['finished'])}>
          <a className='block'>{t('finishedTab')}</a>
        </Link>
      ),
      content: <End />,
    },
    {
      value: HeaderTab.Draft,
      label: (
        <Link passHref href={UriUtils.replace(['editing'])}>
          <a className='block'>{t('draftTab')}</a>
        </Link>
      ),
      content: <Draft />,
    },
  ];
  return (
    <Layout title={t('menuMyMarketingAction')}>
      <div className='flex h-full'>
        <Tabs className='w-full h-full' items={tabs} value={marketingActionStatus as string} />
      </div>
    </Layout>
  );
};
