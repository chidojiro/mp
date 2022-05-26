import React from 'react';
import { useTranslation } from 'next-i18next';

import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { RowHeader } from './RowHeader';
import { useActionMonthlyReport } from '@/report/useActionMonthlyReport';
import { ReportUtils } from '@/report/utils';
import { groupBy } from 'lodash-es';
import { format } from 'date-fns';
import { ReturnToListButton } from '@/report/ReturnToListButton';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  actionType?: string;
  organizationId: string;
  projectId: string;
};

// eslint-disable-next-line no-empty-pattern
export const NotificationDetailsTable = ({ className }: Props) => {
  const { t } = useTranslation('report');

  const { data } = useActionMonthlyReport();

  const dataGroupedByMonth = groupBy(data, 'aggregated_month');

  const tableData = Object.keys(dataGroupedByMonth)
    .map(aggregated_month => ({
      aggregated_month,
      data: ReportUtils.getTableDataGroupedByNotificationType(dataGroupedByMonth[aggregated_month]),
    }))
    .sort((a, b) => new Date(b.aggregated_month).valueOf() - new Date(a.aggregated_month).valueOf())
    .map(({ aggregated_month, data }) => ({
      aggregated_month: format(new Date(aggregated_month), 'yyyy年MM月'),
      data,
    }));

  const headers = [
    t('yearMonth'),
    t('deliveryType'),
    t('numberOfUUsDelivered'),
    t('openUuRate'),
    t('clickedUuRate'),
    t('cvUuRate'),
  ];

  return (
    <>
      <Table className={className}>
        <Table.Head>
          <Table.Row>
            {headers.map(title => (
              <Table.Header key={title}>{title}</Table.Header>
            ))}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {tableData.map(item => {
            const getRate = (uu: number, type: 'line' | 'mail') => {
              if (item.data[type].delivery_uu === 0) return '(0.0%)';

              return `(${(uu / item.data[type].delivery_uu).toFixed(1)}%)`;
            };

            return (
              <React.Fragment key={item.aggregated_month}>
                <Table.Row>
                  <Table.Cell rowSpan={2}>
                    <RowHeader title={item.aggregated_month} />
                  </Table.Cell>
                  <Table.Cell className='text-right'>LINE</Table.Cell>
                  <Table.Cell className='text-right'>{item.data.line.delivery_uu}</Table.Cell>
                  <Table.Cell className='text-right'>
                    {item.data.line.open_uu} {getRate(item.data.line.open_uu, 'line')}
                  </Table.Cell>
                  <Table.Cell className='text-right'>
                    {item.data.line.click_uu} {getRate(item.data.line.click_uu, 'line')}
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <div>
                        {item.data.line.cv_uu.custom} {getRate(item.data.line.cv_uu.custom, 'line')}
                      </div>
                      <div>{item.data.line.cv_uu.finalAmount}円</div>
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className='text-right'>{t('email')}</Table.Cell>
                  <Table.Cell className='text-right'>{item.data.mail.delivery_uu}</Table.Cell>
                  <Table.Cell className='text-right'>
                    {item.data.mail.open_uu} {getRate(item.data.mail.open_uu, 'mail')}
                  </Table.Cell>
                  <Table.Cell className='text-right'>
                    {item.data.mail.click_uu} {getRate(item.data.mail.click_uu, 'mail')}
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <div>
                        {item.data.mail.cv_uu.custom} {getRate(item.data.mail.cv_uu.custom, 'mail')}
                      </div>
                      <div>{item.data.mail.cv_uu.finalAmount}円</div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            );
          })}
        </Table.Body>
      </Table>
      <ReturnToListButton to='line-email' />
    </>
  );
};
