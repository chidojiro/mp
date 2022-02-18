import { Value } from 'classnames';
import React from 'react';
import { SideMenu } from '../../../common';
import { MarketingAction } from './MarketingAction';

// example
const listMenu = [
  {
    id: '1',
    name: 'カゴ落ち通知',
    content: <MarketingAction />,
  },
  {
    id: '2',
    name: '購入後ステップ配信',
    content: <MarketingAction />,
  },
  {
    id: '3',
    name: 'レコメンド診断ボット（静的）',
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
