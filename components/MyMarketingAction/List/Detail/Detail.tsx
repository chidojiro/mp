import { Value } from 'classnames';
import React from 'react';
import { SideMenu, SideMenuItem } from '../../../common';
import { MarketingAction } from './MarketingAction';

// example
const listMenu: SideMenuItem[] = [
  {
    value: '1',
    label: 'カゴ落ち通知',
    content: <MarketingAction />,
  },
  {
    value: '2',
    label: '購入後ステップ配信',
    content: <MarketingAction />,
  },
  {
    value: '3',
    label: 'レコメンド診断ボット（静的）',
    content: <MarketingAction />,
  },
];

export const Detail = () => {
  const onChange = (value: Value) => {
    // TODO
  };

  return (
    <div className='flex w-full h-full mt-7'>
      <SideMenu items={listMenu} onChange={onChange} />
    </div>
  );
};
