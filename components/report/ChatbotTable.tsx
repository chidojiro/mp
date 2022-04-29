import React from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Table } from '@/components/common';
import { ClassName, MarketingActionAliasKey } from '@/types';

import { RowHeader } from './RowHeader';

const data = [
  {
    id: '0',
    name: 'all',
    numberOfUUsDelivered: '5,000',
    openUuRate: '200（4.0%）',
    usedUuRate: '200（4.0%）',
    cvUuRate: {
      intermediateCv: {
        rate: '12（0.2％）',
      },
      finalCv: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
  {
    id: '1',
    name: 'カートページFAQ',
    alias: MarketingActionAliasKey.CART_PAGE_FAQ,
    numberOfUUsDelivered: '5,000',
    openUuRate: '200（4.0%）',
    usedUuRate: '200（4.0%）',
    cvUuRate: {
      intermediateCv: {
        rate: '12（0.2％）',
      },
      finalCv: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
  {
    id: '2',
    name: '全体の購入履歴に基づくランキング（動的）',
    alias: MarketingActionAliasKey.HISTORY_PURCHASE,
    numberOfUUsDelivered: '5,000',
    openUuRate: '200（4.0%）',
    usedUuRate: '200（4.0%）',
    cvUuRate: {
      intermediateCv: {
        rate: '12（0.2％）',
      },
      finalCv: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
  {
    id: '3',
    name: 'レコメンド診断ボット（静的）',
    alias: MarketingActionAliasKey.RECOMMEND_DIAGNOSTIC,
    numberOfUUsDelivered: '5,000',
    openUuRate: '200（4.0%）',
    usedUuRate: '200（4.0%）',
    cvUuRate: {
      intermediateCv: {
        rate: '12（0.2％）',
      },
      finalCv: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
  {
    id: '4',
    name: '全体の購入履歴に基づくカテゴリー毎のランキング（動的）',
    alias: MarketingActionAliasKey.HISTORY_PURCHASE_CATEGORY,
    numberOfUUsDelivered: '5,000',
    openUuRate: '200（4.0%）',
    usedUuRate: '200（4.0%）',
    cvUuRate: {
      intermediateCv: {
        rate: '12（0.2％）',
      },
      finalCv: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
];

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const ChatbotTable = ({ className }: Props) => {
  const { t } = useTranslation('report');
  const {
    pathname,
    query: { organizationId, projectId, actionType },
  } = useRouter();
  const headers = [
    t('measure'),
    t('numberOfUUsDelivered'),
    t('openUuRate'),
    t('usedUuRate'),
    t('cvUuRate'),
  ];
  const baseUrl = `/organizations/${organizationId}/projects/${projectId}/reports/action-reports`;
  return (
    <Table className={className}>
      <Table.Head>
        <Table.Row className='rounded-tl-md rounded-tr-md'>
          {headers.map(title => (
            <Table.Header key={title} className='whitespace-pre text-center'>
              {title}
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell className='w-5/12'>
              <RowHeader
                title={t(item.name)}
                monthlyUrl={
                  item.alias
                    ? {
                        pathname: `${baseUrl}/${item.alias}/monthly`,
                        query: { targets: ['all'] },
                      }
                    : undefined
                }
              />
            </Table.Cell>
            <Table.Cell className='text-right w-1/12'>{item.numberOfUUsDelivered}</Table.Cell>
            <Table.Cell className='text-right w-2/12'>{item.openUuRate}</Table.Cell>
            <Table.Cell className='text-right w-2/12'>{item.usedUuRate}</Table.Cell>
            <Table.Cell className='w-2/12'>
              <div className='flex'>
                <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                <div>{item.cvUuRate.intermediateCv.rate}</div>
              </div>
              <div className='flex mt-2'>
                <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                <div>
                  <div>{item.cvUuRate.finalCv.rate}</div>
                  <div>{item.cvUuRate.finalCv.price}</div>
                </div>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
