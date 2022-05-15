import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Icon } from '@/common/Icon';
import { Select } from '@/common/Select';
import { Table } from '@/common/Table';
import { PrivateLayout } from '@/layout/PrivateLayout';

export const getServerSideProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'customSegment'])),
    },
  };
};

const data = [
  {
    id: '0',
    name: 'ここにメッセージ名が入ります',
    targetSegment:
      'ここにセグメント名が入りますここにセグメント名が入りますここにセグメント名が入ります',
    deliveryDate: '2021年12月13日(月) 午前10:00',
    line: {
      numberOfUUsDelivered: '5,000',
      openUUsRate: '200（4.0%）',
    },
    email: {
      numberOfUUsDelivered: '2,000',
      openUUsRate: '80.0%）',
    },
  },
  {
    id: '1',
    name: 'ここにメッセージ名が入ります',
    targetSegment:
      'ここにセグメント名が入りますここにセグメント名が入りますここにセグメント名が入ります',
    deliveryDate: '2021年12月13日(月) 午前10:00',
    email: {
      numberOfUUsDelivered: '2,000',
      openUUsRate: '80.0%）',
    },
  },
  {
    id: '2',
    name: 'ここにメッセージ名が入ります',
    targetSegment:
      'ここにセグメント名が入りますここにセグメント名が入りますここにセグメント名が入ります',
    deliveryDate: '2021年12月13日(月) 午前10:00',
    line: {
      numberOfUUsDelivered: '2,000',
      openUUsRate: '80.0%）',
    },
  },
];

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const MessageReport = ({}: Props) => {
  const { t } = useTranslation('customSegment');
  const { asPath } = useRouter();

  return (
    <PrivateLayout title={t('segmentMessageReport')} subTitle={t('list')}>
      <div className='space-y-5'>
        <div className='flex items-center gap-5'>
          <div className='font-bold'>{t('targetSegment')}</div>
          <Select
            options={[{ label: t('allSegments'), value: 'allSegments' }]}
            value='allSegments'
          />
        </div>
      </div>
      <Table className='mt-10'>
        <Table.Head>
          <Table.Row>
            <Table.Cell>{t('messageName')}</Table.Cell>
            <Table.Cell>{t('targetSegment')}</Table.Cell>
            <Table.Cell>{t('deliveryDate')}</Table.Cell>
            <Table.Cell>{t('deliveryType')}</Table.Cell>
            <Table.Cell>{t('numberOfUUsDelivered')}</Table.Cell>
            <Table.Cell>{t('openUUsRate')}</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(item => (
            <React.Fragment key={item.id}>
              <Table.Row>
                <Table.Cell rowSpan={2}>
                  <Link passHref href={`${asPath}/1`}>
                    <a>
                      <div className='underline text-primary'>{item.name}</div>
                      <div className='flex items-center mt-1 text-gray-600'>
                        {t('viewByLinkUrl')}
                        <Icon name='chevron-right' className='text-secondary' size={30} />
                      </div>
                    </a>
                  </Link>
                </Table.Cell>
                <Table.Cell className='text-right' rowSpan={2}>
                  {item.targetSegment}
                </Table.Cell>
                <Table.Cell className='text-right' rowSpan={2}>
                  {item.deliveryDate}
                </Table.Cell>
                {!!item.line && (
                  <>
                    <Table.Cell className='text-center' rowSpan={item.email ? 1 : 2}>
                      LINE
                    </Table.Cell>
                    <Table.Cell className='text-right' rowSpan={item.email ? 1 : 2}>
                      {item.line.numberOfUUsDelivered}
                    </Table.Cell>
                    <Table.Cell className='text-right' rowSpan={item.email ? 1 : 2}>
                      {item.line.openUUsRate}
                    </Table.Cell>
                  </>
                )}
              </Table.Row>
              {!!item.email && (
                <Table.Row>
                  <Table.Cell className='text-center' rowSpan={item.email ? 1 : 2}>
                    {t('email')}
                  </Table.Cell>
                  <Table.Cell className='text-right' rowSpan={item.email ? 1 : 2}>
                    {item.email.numberOfUUsDelivered}
                  </Table.Cell>
                  <Table.Cell className='text-right' rowSpan={item.email ? 1 : 2}>
                    {item.email.openUUsRate}
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </PrivateLayout>
  );
};

export default MessageReport;
