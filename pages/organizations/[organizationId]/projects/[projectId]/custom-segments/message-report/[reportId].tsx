import { Icon, Layout, Select, Table } from '@/components';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = async ({ locale = 'ja' }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'customSegment'])),
    },
  };
};

const data = {
  id: '0',
  deliveryDate: '2021年12月13日(月) 午前10:00',
  line: {
    numberOfUUsDelivered: '5,000',
    openUUsRate: '200（4.0%）',
    totalClickUUsRate: '200（4.0%）',
    totalCvUUsRate: '10（0.2％）\n256,000円',
    linkUrls: [
      {
        url: 'http://google.com',
        clickUUsRate: '200（4.0%）',
        cvUUsRate: '10（0.2％）\n256,000円',
      },
      {
        url: 'http://google.com',
        clickUUsRate: '200（4.0%）',
        cvUUsRate: '10（0.2％）\n256,000円',
      },
    ],
  },
  email: {
    numberOfUUsDelivered: '5,000',
    openUUsRate: '200（4.0%）',
    totalClickUUsRate: '200（4.0%）',
    totalCvUUsRate: '10（0.2％）\n256,000円',
    linkUrls: [
      {
        url: 'http://google.com',
        clickUUsRate: '200（4.0%）',
        cvUUsRate: '10（0.2％）\n256,000円',
      },
      {
        url: 'http://google.com',
        clickUUsRate: '200（4.0%）',
        cvUUsRate: '10（0.2％）\n256,000円',
      },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const MessageReportDetails = ({}: Props) => {
  const { t } = useTranslation('customSegment');
  const { asPath } = useRouter();

  return (
    <Layout title={t('segmentMessageReport')} subTitle={t('list')}>
      <div className='space-y-5'>
        <div className='flex items-center gap-5'>
          <div className='font-bold'>{t('targetSegment')}</div>
          <Select
            options={[{ label: t('allSegments'), value: 'allSegments' }]}
            value='allSegments'
          />
        </div>
      </div>
      <h3 className='mt-10 mb-6 text-gray-600'>{t('summary')}</h3>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>{t('deliveryDate')}</Table.Cell>
            <Table.Cell>{t('deliveryType')}</Table.Cell>
            <Table.Cell>{t('numberOfUUsDelivered')}</Table.Cell>
            <Table.Cell>{t('openUUsRate')}</Table.Cell>
            <Table.Cell>{t('totalClickUUsRate')}</Table.Cell>
            <Table.Cell>{t('totalCvUUsRate')}</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell rowSpan={2}>{data.deliveryDate}</Table.Cell>
            <Table.Cell className='text-center'>LINE</Table.Cell>
            <Table.Cell className='text-right'>{data.line.numberOfUUsDelivered}</Table.Cell>
            <Table.Cell className='text-right'>{data.line.openUUsRate}</Table.Cell>
            <Table.Cell className='text-right'>{data.line.totalClickUUsRate}</Table.Cell>
            <Table.Cell className='text-right whitespace-pre'>
              {data.line.totalCvUUsRate}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className='text-center'>{t('email')}</Table.Cell>
            <Table.Cell className='text-right'>{data.email.numberOfUUsDelivered}</Table.Cell>
            <Table.Cell className='text-right'>{data.email.openUUsRate}</Table.Cell>
            <Table.Cell className='text-right'>{data.line.totalClickUUsRate}</Table.Cell>
            <Table.Cell className='text-right whitespace-pre'>
              {data.line.totalCvUUsRate}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <div className='mt-2 text-gray-600 text-medium'>{t('summaryDescription')}</div>

      <h3 className='mt-10 mb-6 text-gray-600'>{t('linkUrl')}</h3>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Cell>{t('deliveryType')}</Table.Cell>
            <Table.Cell>{t('linkUrl')}</Table.Cell>
            <Table.Cell>{t('clickUUsRate')}</Table.Cell>
            <Table.Cell>{t('cvUUsRate')}</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell rowSpan={2}>LINE</Table.Cell>
            <Table.Cell className='text-right'>{data.line.linkUrls[0].url}</Table.Cell>
            <Table.Cell className='text-right'>{data.line.linkUrls[0].clickUUsRate}</Table.Cell>
            <Table.Cell className='text-right'>{data.line.linkUrls[0].cvUUsRate}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className='text-right'>{data.line.linkUrls[1].url}</Table.Cell>
            <Table.Cell className='text-right'>{data.line.linkUrls[1].clickUUsRate}</Table.Cell>
            <Table.Cell className='text-right'>{data.line.linkUrls[1].cvUUsRate}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell rowSpan={2}>{t('email')}</Table.Cell>
            <Table.Cell className='text-right'>{data.email.linkUrls[0].url}</Table.Cell>
            <Table.Cell className='text-right'>{data.email.linkUrls[0].clickUUsRate}</Table.Cell>
            <Table.Cell className='text-right'>{data.email.linkUrls[0].cvUUsRate}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell className='text-right'>{data.email.linkUrls[1].url}</Table.Cell>
            <Table.Cell className='text-right'>{data.email.linkUrls[1].clickUUsRate}</Table.Cell>
            <Table.Cell className='text-right'>{data.email.linkUrls[1].cvUUsRate}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Link passHref href='/organizations/1/projects/1/custom-segments/message-report'>
        <a className='flex justify-end mt-5'>
          <div className='flex items-center text-gray-600 transform translate-x-2'>
            {t('returnToList')}
            <ChevronRightIcon
              scale={12}
              className='text-secondary'
              width={28}
              height={28}
              aria-hidden='true'
            />
          </div>
        </a>
      </Link>
    </Layout>
  );
};

export default MessageReportDetails;
