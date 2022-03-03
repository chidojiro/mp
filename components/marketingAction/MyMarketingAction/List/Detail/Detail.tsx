import { Value } from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SideMenu, SideMenuGroup, SideMenuItem } from '../../../../common';
import { TargetFilter } from '../../../../report';
import { MarketingAction } from './MarketingAction';

export const Detail = () => {
  const { query, pathname } = useRouter();
  const { t } = useTranslation('marketingAction');

  const onChange = (value: Value) => {
    // TODO
  };

  // example
  const listMenu: SideMenuItem[] = [
    {
      value: '1',
      label: (
        <Link href={{ pathname, query: { ...query, marketingActionId: '1', date: 'all' } }}>
          カゴ落ち通知
        </Link>
      ),
      content: <MarketingAction />,
    },
    {
      value: '2',
      label: '購入後ステップ配信',
      children: [
        {
          value: '2021_12_15',

          label: (
            <Link
              href={{ pathname, query: { ...query, marketingActionId: '2', date: '2021_12_15' } }}
            >
              2022年12月15日(水) 〜
            </Link>
          ),
          content: <MarketingAction />,
        },
        {
          value: '2021_11_09',
          label: (
            <Link
              href={{ pathname, query: { ...query, marketingActionId: '2', date: '2021_11_09' } }}
            >
              2022年11月09日(月) 〜
            </Link>
          ),
          content: <MarketingAction />,
        },
      ],
    },
    {
      value: '3',
      label: (
        <Link href={{ pathname, query: { ...query, marketingActionId: '3', date: 'all' } }}>
          レコメンド診断ボット（静的）
        </Link>
      ),
      content: <MarketingAction />,
    },
  ];

  const groups: SideMenuGroup[] = [
    {
      icon: 'mail',
      label: t('messageDelivery'),
      items: listMenu,
    },
  ];

  const value = (query.date !== 'all' ? query.date : query.marketingActionId) as string;

  return (
    <div className='flex flex-col w-full h-full mt-7'>
      <div className='mb-[60px]'>
        <TargetFilter />
      </div>
      <SideMenu groups={groups} onChange={onChange} value={value} />
    </div>
  );
};
