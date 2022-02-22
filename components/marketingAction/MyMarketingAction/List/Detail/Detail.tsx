import { Value } from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SideMenu, SideMenuItem } from '../../../../common';
import { MarketingAction } from './MarketingAction';

export const Detail = () => {
  const { query, pathname } = useRouter();

  const onChange = (value: Value) => {
    // TODO
  };

  // example
  const listMenu: SideMenuItem[] = [
    {
      value: '1',
      label: <Link href={{ pathname, query: { ...query, marketingActionId: '1' } }}>カゴ落ち通知</Link>,
      content: <MarketingAction />,
    },
    {
      value: '2',
      label: <Link href={{ pathname, query: { ...query, marketingActionId: '2' } }}>購入後ステップ配信</Link>,
      content: <MarketingAction />,
    },
    {
      value: '3',
      label: <Link href={{ pathname, query: { ...query, marketingActionId: '3' } }}>レコメンド診断ボット（静的）</Link>,
      content: <MarketingAction />,
    },
  ];

  return (
    <div className='flex w-full h-full mt-7'>
      <SideMenu items={listMenu} onChange={onChange} value={query.marketingActionId as string} />
    </div>
  );
};
