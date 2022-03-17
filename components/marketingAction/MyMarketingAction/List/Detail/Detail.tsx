import { Value } from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SideMenu, SideMenuGroup, SideMenuItem } from '../../../../common';
import { TargetFilter } from '../../../../report';
import { MarketingAction } from './MarketingAction';

export const Detail = () => {
  const { query, pathname, push } = useRouter();
  const { t } = useTranslation('marketingAction');

  const onChange = (value: Value) => {
    // TODO
  };

  const handleMAChange = (queryParams: any) => {
    push({
      pathname,
      query: { ...query, ...queryParams },
    });
  };

  // example
  const messageMenu: SideMenuItem[] = [
    {
      value: '1',
      onClick: () => handleMAChange({ marketingActionId: '1', date: 'all' }),
      label: t('cartAbandoned'),
      content: <MarketingAction />,
    },
    {
      value: '2',
      label: '購入後ステップ配信',
      children: [
        {
          value: '2021_12_15',
          onClick: () => handleMAChange({ marketingActionId: '2', date: '2021_12_15' }),
          label: '2022年12月15日(水) 〜',
          content: <MarketingAction />,
        },
        {
          value: '2021_11_09',
          onClick: () => handleMAChange({ marketingActionId: '2', date: '2021_11_09' }),
          label: '2022年11月09日(月) 〜',
          content: <MarketingAction />,
        },
      ],
    },
  ];

  const chatbotMenu: SideMenuItem[] = [
    {
      value: '3',
      onClick: () => handleMAChange({ marketingActionId: '3', date: 'all' }),
      label: t('recommendationDiagnosisBotStatic'),
      content: <MarketingAction />,
    },
  ];
  const popupMenu: SideMenuItem[] = [
    {
      value: '4',
      onClick: () => handleMAChange({ marketingActionId: '4', date: 'all' }),
      label: t('conditionalFreeShipping'),
      content: <MarketingAction />,
    },
  ];

  const groups: SideMenuGroup[] = [
    {
      icon: 'mail',
      label: t('messageDelivery'),
      items: messageMenu,
    },
    {
      icon: 'chatbot2',
      label: t('chatbot'),
      items: chatbotMenu,
    },
    {
      icon: 'popup',
      label: t('popup'),
      items: popupMenu,
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
