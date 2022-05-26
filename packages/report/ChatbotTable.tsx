import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { NumberUtils } from '@/common/utils';
import { MarketingActionAliasKey } from '@/marketing-action/types';
import { groupBy } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { RowHeader } from './RowHeader';
import { useActionsReport } from './useActionsReport';
import { ReportUtils } from './utils';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const ChatbotTable = ({ className }: Props) => {
  const { t } = useTranslation('report');
  const { t: tMarketingAction } = useTranslation('marketingAction');

  const { data: report } = useActionsReport('bot');
  const reportGroupedByAlias = groupBy(report, 'marketing_action.marketing_action_type.alias');
  const all = ReportUtils.getTableData(report);
  const cartFaqData = ReportUtils.getTableData(
    reportGroupedByAlias[MarketingActionAliasKey.CART_PAGE_FAQ]
  );
  const historyPurchaseData = ReportUtils.getTableData(
    reportGroupedByAlias[MarketingActionAliasKey.HISTORY_PURCHASE]
  );
  const diagnosticData = ReportUtils.getTableData(
    reportGroupedByAlias[MarketingActionAliasKey.RECOMMEND_DIAGNOSTIC]
  );
  const categoryData = ReportUtils.getTableData(
    reportGroupedByAlias[MarketingActionAliasKey.HISTORY_PURCHASE_CATEGORY]
  );
  const reportData = [all, cartFaqData, historyPurchaseData, diagnosticData, categoryData];
  const reportMetaData = [
    { name: t('all'), showCustomUU: true },
    { name: tMarketingAction('cartPageFaq'), alias: MarketingActionAliasKey.CART_PAGE_FAQ },
    {
      name: tMarketingAction('rankingBasedOnOverallPurchaseHistory'),
      alias: MarketingActionAliasKey.HISTORY_PURCHASE,
      showCustomUU: true,
    },
    {
      name: tMarketingAction('recommendationDiagnosisBotStatic'),
      alias: MarketingActionAliasKey.RECOMMEND_DIAGNOSTIC,
      showCustomUU: true,
    },
    {
      name: tMarketingAction('rankingByCategoryBasedOnOverallPurchaseHistory'),
      alias: MarketingActionAliasKey.HISTORY_PURCHASE_CATEGORY,
      showCustomUU: true,
    },
  ];

  const {
    query: { organizationId, projectId },
  } = useRouter();
  const headers = [
    t('measure'),
    t('numberOfUUsDisplayed'),
    t('openUUsRate'),
    t('usedUuRate'),
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
          const getRate = (uu: number) => {
            if (item.display_uu === 0) return '(0.0%)';

            return `(${((uu * 100) / item.display_uu).toFixed(1)}%)`;
          };

          return (
            <Table.Row key={idx}>
              <Table.Cell className='w-5/12'>
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
              <Table.Cell className='text-right w-1/12'>
                {NumberUtils.separate(item.display_uu)}
              </Table.Cell>
              <Table.Cell className='text-right w-2/12'>
                {NumberUtils.separate(item.open_uu)} {getRate(item.open_uu)}
              </Table.Cell>
              <Table.Cell className='text-right w-2/12'>
                {NumberUtils.separate(item.use_uu)} {getRate(item.use_uu)}
              </Table.Cell>
              <Table.Cell className='w-2/12'>
                {!!reportMetaData[idx].showCustomUU && (
                  <div className='flex'>
                    <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                    <div>
                      {NumberUtils.separate(item.cv_uu.custom)} {getRate(item.cv_uu.custom)}
                    </div>
                  </div>
                )}
                <div className='flex mt-2'>
                  <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                  <div>
                    <div>
                      {NumberUtils.separate(item.cv_uu.final)} {getRate(item.cv_uu.final)}
                    </div>
                    <div>{NumberUtils.separate(item.cv_uu.finalAmount)}円</div>
                  </div>
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
