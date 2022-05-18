import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { RowHeader } from './RowHeader';
import { useReport } from '@/report/useReport';
import { groupBy } from 'lodash-es';
import { MarketingActionAlias } from '@/marketing-action/types';
import { ReportUtils } from './utils';

type Props = ClassName;

export const LineMailTable = ({ className = 'table-fixed' }: Props) => {
  const { t } = useTranslation('report');
  const { t: tMarketingAction } = useTranslation('marketingAction');

  const { data: report } = useReport('notification');

  const reportGroupedByAlias = groupBy(report, 'marketing_action.marketing_action_type.alias');

  const all = ReportUtils.getTableDataGroupedByNotificationType(report);
  const cartAbandonedData = ReportUtils.getTableDataGroupedByNotificationType(
    reportGroupedByAlias[MarketingActionAlias.CART_LEFT_NOTIFICATION]
  );
  const afterPurchaseData = ReportUtils.getTableDataGroupedByNotificationType(
    reportGroupedByAlias[MarketingActionAlias.AFTER_PURCHASE]
  );
  const reportData = [all, cartAbandonedData, afterPurchaseData];
  const reportMetaData = [
    { name: t('all'), showCustomUU: true },
    { name: tMarketingAction('cartAbandoned'), alias: MarketingActionAlias.CART_LEFT_NOTIFICATION },
    {
      name: tMarketingAction('stepDeliveryAfterPurchase'),
      alias: MarketingActionAlias.AFTER_PURCHASE,
    },
  ];

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
        {reportData.map((item, idx) => (
          <React.Fragment key={idx}>
            <Table.Row>
              <Table.Cell rowSpan={2}>
                <RowHeader
                  title={t(reportMetaData[idx].name)}
                  monthlyUrl={
                    reportMetaData[idx].alias
                      ? {
                          pathname: `${baseUrl}/${reportMetaData[idx].alias}/monthly`,
                          query: { targets: ['all'] },
                        }
                      : undefined
                  }
                />
              </Table.Cell>
              <Table.Cell>LINE</Table.Cell>
              <Table.Cell className='text-right'>{item.line.delivery_uu}</Table.Cell>
              <Table.Cell className='text-right'>{item.line.open_uu}</Table.Cell>
              <Table.Cell className='text-right'>{item.line.click_uu}</Table.Cell>
              <Table.Cell>
                {!!reportMetaData[idx].showCustomUU && (
                  <div className='flex'>
                    <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                    <div>{item.line.cv_uu.custom}</div>
                  </div>
                )}
                <div className='flex mt-2'>
                  <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                  <div>
                    <div>{item.line.cv_uu.final}</div>
                    {/* <div>{item.line.cvUuRate.finalCv.price}</div> */}
                  </div>
                </div>
              </Table.Cell>
            </Table.Row>
            <Table.Row className='bg-gray-A200'>
              <Table.Cell>{t('email')}</Table.Cell>
              <Table.Cell className='text-right'>{item.mail.delivery_uu}</Table.Cell>
              <Table.Cell className='text-right'>{item.mail.open_uu}</Table.Cell>
              <Table.Cell className='text-right'>{item.mail.click_uu}</Table.Cell>
              <Table.Cell>
                {!!reportMetaData[idx].showCustomUU && (
                  <div className='flex'>
                    <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                    <div>{item.mail.cv_uu.custom}</div>
                  </div>
                )}
                <div className='flex mt-2'>
                  <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                  <div>
                    <div>{item.mail.cv_uu.final}</div>
                    {/* <div>{item.mail.cvUuRate.finalCv.price}</div> */}
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
