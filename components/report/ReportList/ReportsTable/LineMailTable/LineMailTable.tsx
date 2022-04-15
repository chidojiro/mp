import React from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Table } from '@/components/common';
import { ClassName } from '@/types';

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
    id: '3',
    name: 'アンケート',
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

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const LineMailTable = ({ className }: Props) => {
  const { t } = useTranslation('report');
  const {
    query: { organizationId, projectId, actionType },
    pathname,
  } = useRouter();

  return (
    <Table className={className}>
      <Table.Head>
        <Table.Row>
          <Table.Cell>{t('measure')}</Table.Cell>
          <Table.Cell>{t('deliveryType')}</Table.Cell>
          <Table.Cell>{t('numberOfUUsDelivered')}</Table.Cell>
          <Table.Cell>{t('openUuRate')}</Table.Cell>
          <Table.Cell>{t('clickedUuRate')}</Table.Cell>
          <Table.Cell>{t('cvUuRate')}</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(item => (
          <React.Fragment key={item.id}>
            <Table.Row>
              <Table.Header rowSpan={2}>
                {item.name === 'all' ? (
                  t('all')
                ) : (
                  <Link
                    passHref
                    href={{
                      pathname: `${pathname}/${item.id}`,
                      query: { organizationId, projectId, actionType, targets: ['all'] },
                    }}
                  >
                    <a className='underline text-primary'>{item.name}</a>
                  </Link>
                )}
              </Table.Header>
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
            <Table.Row>
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
