import React from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Table } from '@/components';
import { ClassName } from '@/types';

const data = [
  {
    id: '0',
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
    second: {
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
    first: {
      numberOfUUsDisplayed: '5,000',
      openUuRate: '200（4.0%）',
      usedUuRate: '200（4.0%）',
      cvUuRate: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
    second: {
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
    first: {
      numberOfUUsDisplayed: '5,000',
      openUuRate: '200（4.0%）',
      usedUuRate: '200（4.0%）',
      cvUuRate: {
        rate: '12（0.2％）',
        price: '256,000円',
      },
    },
    second: {
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
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const ReportTable = ({ className }: Props) => {
  const { t } = useTranslation('report');

  return (
    <Table className={className}>
      <Table.Head>
        <Table.Row>
          <Table.Cell>{t('yearMonth')}</Table.Cell>
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
              <Table.Header rowSpan={2}>{item.time}</Table.Header>
              <Table.Cell className='text-right'>LINE</Table.Cell>
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
            <Table.Row>
              <Table.Cell className='text-right'>{t('email')}</Table.Cell>
              <Table.Cell className='text-right'>{item.second.numberOfUUsDisplayed}</Table.Cell>
              <Table.Cell className='text-right'>{item.second.openUuRate}</Table.Cell>
              <Table.Cell className='text-right'>{item.second.usedUuRate}</Table.Cell>
              <Table.Cell>
                <div>
                  <div>{item.second.cvUuRate.rate}</div>
                  <div>{item.second.cvUuRate.price}</div>
                </div>
              </Table.Cell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table.Body>
    </Table>
  );
};
