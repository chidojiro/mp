import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { RowHeader } from './RowHeader';
import { useActionsReport } from '@/report/useActionsReport';
import { groupBy } from 'lodash-es';
import { MarketingActionAliasKey } from '@/marketing-action/types';
import { ReportUtils } from './utils';
import { NumberUtils } from '@/common/utils';

type Props = ClassName;

export const NotificationTable = ({ className = 'table-fixed' }: Props) => {
  const { t } = useTranslation('report');
  const { t: tMarketingAction } = useTranslation('marketingAction');

  const { data: report } = useActionsReport('notification');

  console.log(report);

  const reportGroupedByAlias = groupBy(report, 'marketing_action.marketing_action_type.alias');

  const all = ReportUtils.getTableDataGroupedByNotificationType(report);
  const cartAbandonedData = ReportUtils.getTableDataGroupedByNotificationType(
    reportGroupedByAlias[MarketingActionAliasKey.CART_LEFT_NOTIFICATION]
  );
  const afterPurchaseData = ReportUtils.getTableDataGroupedByNotificationType(
    reportGroupedByAlias[MarketingActionAliasKey.AFTER_PURCHASE]
  );
  const reportData = [all, cartAbandonedData, afterPurchaseData];
  const reportMetaData = [
    { name: t('all'), showCustomUU: true },
    {
      name: tMarketingAction('cartAbandoned'),
      alias: MarketingActionAliasKey.CART_LEFT_NOTIFICATION,
    },
    {
      name: tMarketingAction('stepDeliveryAfterPurchase'),
      alias: MarketingActionAliasKey.AFTER_PURCHASE,
    },
  ];

  const {
    query: { organizationId, projectId },
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
        {reportData.map((item, idx) => {
          const getRate = (uu: number, type: 'line' | 'mail') => {
            if (item[type].delivery_uu === 0) return '(0.0%)';

            return `(${(uu / item[type].delivery_uu).toFixed(1)}%)`;
          };

          return (
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
                <Table.Cell className='text-right'>
                  {NumberUtils.separate(item.line.delivery_uu)}
                </Table.Cell>
                <Table.Cell className='text-right'>
                  {NumberUtils.separate(item.line.open_uu)} {getRate(item.line.open_uu, 'line')}
                </Table.Cell>
                <Table.Cell className='text-right'>
                  {NumberUtils.separate(item.line.click_uu)} {getRate(item.line.click_uu, 'line')}
                </Table.Cell>
                <Table.Cell>
                  {!!reportMetaData[idx].showCustomUU && (
                    <div className='flex'>
                      <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                      <div>
                        {NumberUtils.separate(item.line.cv_uu.custom)}{' '}
                        {getRate(item.line.cv_uu.custom, 'line')}
                      </div>
                    </div>
                  )}
                  <div className='flex mt-2'>
                    <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                    <div>
                      <div>{NumberUtils.separate(item.line.cv_uu.final)}</div>
                      <div>{item.line.cv_uu.finalAmount}円</div>
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row className='bg-gray-A200'>
                <Table.Cell>{t('email')}</Table.Cell>
                <Table.Cell className='text-right'>
                  {NumberUtils.separate(item.mail.delivery_uu)}
                </Table.Cell>
                <Table.Cell className='text-right'>
                  {NumberUtils.separate(item.mail.open_uu)} {getRate(item.mail.open_uu, 'mail')}
                </Table.Cell>
                <Table.Cell className='text-right'>
                  {NumberUtils.separate(item.mail.click_uu)} {getRate(item.mail.click_uu, 'mail')}
                </Table.Cell>
                <Table.Cell>
                  {!!reportMetaData[idx].showCustomUU && (
                    <div className='flex'>
                      <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                      <div>
                        {NumberUtils.separate(item.mail.cv_uu.custom)}{' '}
                        {getRate(item.mail.cv_uu.custom, 'mail')}
                      </div>
                    </div>
                  )}
                  <div className='flex mt-2'>
                    <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                    <div>
                      <div>
                        {NumberUtils.separate(item.mail.cv_uu.final)}{' '}
                        {getRate(item.mail.cv_uu.final, 'mail')}
                      </div>
                      <div>{item.mail.cv_uu.finalAmount}円</div>
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
            </React.Fragment>
          );
        })}
      </Table.Body>
    </Table>
  );
};
