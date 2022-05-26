import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { NumberUtils } from '@/common/utils';
import { ReturnToListButton } from '@/report/ReturnToListButton';
import { useActionMonthlyReport } from '@/report/useActionMonthlyReport';
import { ReportUtils } from '@/report/utils';
import { format } from 'date-fns';
import { groupBy } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { RowHeader } from './RowHeader';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  actionType?: string;
  organizationId: string;
  projectId: string;
};

// eslint-disable-next-line no-empty-pattern
export const ChatbotDetailsTable = ({ className, organizationId, projectId }: Props) => {
  const { t } = useTranslation('report');

  const { data } = useActionMonthlyReport();

  const dataGroupedByMonth = groupBy(data, 'aggregated_month');

  const tableData = Object.keys(dataGroupedByMonth)
    .map(aggregated_month => ({
      aggregated_month,
      data: ReportUtils.getTableData(dataGroupedByMonth[aggregated_month]),
    }))
    .sort((a, b) => new Date(b.aggregated_month).valueOf() - new Date(a.aggregated_month).valueOf())
    .map(({ aggregated_month, data }) => ({
      aggregated_month: format(new Date(aggregated_month), 'yyyy年MM月'),
      data,
    }));

  const headers = [
    t('yearMonth'),
    t('numberOfUUsDisplayed'),
    t('openUuRate'),
    t('usedUuRate'),
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
            const getRate = (uu: number) => {
              if (item.data.display_uu === 0) return '(0.0%)';

              return `(${((uu * 100) / item.data.display_uu).toFixed(1)}%)`;
            };

            return (
              <React.Fragment key={item.aggregated_month}>
                <Table.Row>
                  <Table.Cell>
                    <RowHeader title={item.aggregated_month} />
                  </Table.Cell>
                  <Table.Cell className='text-right'>
                    {NumberUtils.separate(item.data.display_uu)}
                  </Table.Cell>
                  <Table.Cell className='text-right'>
                    {NumberUtils.separate(item.data.open_uu)} {getRate(item.data.open_uu)}
                  </Table.Cell>
                  <Table.Cell className='text-right'>
                    {NumberUtils.separate(item.data.use_uu)} {getRate(item.data.use_uu)}
                  </Table.Cell>
                  <Table.Cell>
                    <div>
                      <div>
                        {NumberUtils.separate(item.data.cv_uu.final)}{' '}
                        {getRate(item.data.cv_uu.final)}
                      </div>
                      <div>{NumberUtils.separate(item.data.cv_uu.finalAmount)}円</div>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            );
          })}
        </Table.Body>
      </Table>
      <ReturnToListButton to='chatbot' />
    </>
  );
};
