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
    line: {
      numberOfUUsDelivered: '5,000',
      openUuRate: '200（4.0%）',
      clickedUuRate: '200（4.0%）',
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
    email: {
      numberOfUUsDelivered: '5,000',
      openUuRate: '200（4.0%）',
      clickedUuRate: '200（4.0%）',
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
  },
  {
    id: '1',
    name: 'カゴ落ち通知',
    alias: MarketingActionAliasKey.CART_LEFT_NOTIFICATION,
    line: {
      numberOfUUsDelivered: '5,000',
      openUuRate: '200（4.0%）',
      clickedUuRate: '200（4.0%）',
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
    email: {
      numberOfUUsDelivered: '5,000',
      openUuRate: '200（4.0%）',
      clickedUuRate: '200（4.0%）',
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
  },
  {
    id: '2',
    name: '購入後ステップ配信',
    alias: MarketingActionAliasKey.AFTER_PURCHASE,
    line: {
      numberOfUUsDelivered: '5,000',
      openUuRate: '200（4.0%）',
      clickedUuRate: '200（4.0%）',
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
    email: {
      numberOfUUsDelivered: '5,000',
      openUuRate: '200（4.0%）',
      clickedUuRate: '200（4.0%）',
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
  },
];

type Props = ClassName;

export const LineMailTable = ({ className = 'table-fixed' }: Props) => {
  const { t } = useTranslation('report');
  const {
    query: { organizationId, projectId, actionType },
  } = useRouter();
  const headers = [
    t('measure'),
    t('deliveryType'),
    t('numberOfUUsDelivered'),
    t('openUuRate'),
    t('clickedUuRate'),
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
          <React.Fragment key={item.id}>
            <Table.Row>
              <Table.Cell rowSpan={2}>
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
              <Table.Cell>LINE</Table.Cell>
              <Table.Cell className='text-right'>{item.line.numberOfUUsDelivered}</Table.Cell>
              <Table.Cell className='text-right'>{item.line.openUuRate}</Table.Cell>
              <Table.Cell className='text-right'>{item.line.clickedUuRate}</Table.Cell>
              <Table.Cell>
                <div className='flex'>
                  <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                  <div>{item.line.cvUuRate.intermediateCv.rate}</div>
                </div>
                <div className='flex mt-2'>
                  <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                  <div>
                    <div>{item.line.cvUuRate.finalCv.rate}</div>
                    <div>{item.line.cvUuRate.finalCv.price}</div>
                  </div>
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-gray-A200'>
              <Table.Cell>{t('email')}</Table.Cell>
              <Table.Cell className='text-right'>{item.line.numberOfUUsDelivered}</Table.Cell>
              <Table.Cell className='text-right'>{item.line.openUuRate}</Table.Cell>
              <Table.Cell className='text-right'>{item.line.clickedUuRate}</Table.Cell>
              <Table.Cell>
                <div className='flex'>
                  <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                  <div>{item.line.cvUuRate.intermediateCv.rate}</div>
                </div>
                <div className='flex mt-2'>
                  <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                  <div>
                    <div>{item.line.cvUuRate.finalCv.rate}</div>
                    <div>{item.line.cvUuRate.finalCv.price}</div>
                  </div>
                </div>
              </Table.Cell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );
};
