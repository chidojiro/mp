import { HeaderTab } from '@/constants';
import { UriUtils } from '@/utils';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Tabs } from '../common';
import { Editting } from './Editting';
import { End } from './End';
import { InProgress } from './InProgress';

export const MyMarketingAction = () => {
  const { t } = useTranslation('myMarketingAction');

  const {
    query: { marketingActionName },
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
          <a className='block'>{t('endTab')}</a>
        </Link>
      ),
      content: <End />,
    },
    {
      value: HeaderTab.Editing,
      label: (
        <Link passHref href={UriUtils.replace(['editing'])}>
          <a className='block'>{t('edittingTab')}</a>
        </Link>
      ),
      content: <Editting />,
    },
  ];
  return (
    <div className='flex h-full'>
      <Tabs className='w-full h-full' items={tabs} value={marketingActionName as string} />
    </div>
  );
};
