import React from 'react';
import { useTranslation } from 'next-i18next';

import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { RowHeader } from './RowHeader';
import { MarketingActionAliasKey } from '@/marketing-action/types';

const data = [
  {
    id: '0',
    alias: MarketingActionAliasKey.CART_LEFT_NOTIFICATION,
    time: '2021年8月',
    first: {
      numberOfUUsDisplayed: '5,000',
      openUuRate: '200（4.0%）',
      usedUuRate: '200（4.0%）',
      cvUuRate: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
  {
    id: '1',
    time: '2021年9月',
    alias: MarketingActionAliasKey.AFTER_PURCHASE,
    first: {
      numberOfUUsDisplayed: '5,000',
      openUuRate: '200（4.0%）',
      usedUuRate: '200（4.0%）',
      cvUuRate: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
  {
    id: '2',
    time: '2021年10月',
    alias: MarketingActionAliasKey.AFTER_PURCHASE,
    first: {
      numberOfUUsDisplayed: '5,000',
      openUuRate: '200（4.0%）',
      usedUuRate: '200（4.0%）',
      cvUuRate: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
  },
];

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  actionType?: string;
  organizationId: string;
  projectId: string;
};

// eslint-disable-next-line no-empty-pattern
export const PopupDetailreport = ({
  className,
  organizationId,
  projectId,
  actionType = '',
}: Props) => {
  const { t } = useTranslation('report');
  const headers = [
    t('yearMonth'),
    t('numberOfUUsDelivered'),
    t('openUuRate'),
    t('clickedUuRate'),
    t('cvUuRate'),
  ];
  const baseUrl = `/organizations/${organizationId}/projects/${projectId}/reports/action-reports`;
  return (
    <Table className={className}>
      <Table.Head>
        <Table.Row>
          {headers.map(title => (
            <Table.Header key={title}>{title}</Table.Header>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(item => (
          <React.Fragment key={item.id}>
            <Table.Row>
              <Table.Cell>
                <RowHeader title={item.time} />
              </Table.Cell>
              <Table.Cell className='text-right'>{item.first.numberOfUUsDisplayed}</Table.Cell>
              <Table.Cell className='text-right'>{item.first.openUuRate}</Table.Cell>
              <Table.Cell className='text-right'>{item.first.usedUuRate}</Table.Cell>
              <Table.Cell>
                <div>
                  <div>{item.first.cvUuRate.rate}</div>
                  <div>{item.first.cvUuRate.price}</div>
                </div>
              </Table.Cell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );
};
