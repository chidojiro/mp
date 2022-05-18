import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Table } from '@/common/Table';
import { ClassName } from '@/common/types';
import { RowHeader } from './RowHeader';
import { useReport } from './useReport';
import { groupBy } from 'lodash-es';
import { ReportUtils } from '@/report/utils';
import { MarketingActionAlias } from '@/marketing-action/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const PopupTable = ({ className }: Props) => {
  const { t } = useTranslation('report');
  const { t: tMarketingAction } = useTranslation('marketingAction');

  const { data: report } = useReport('bot');
  const reportGroupedByAlias = groupBy(report, 'marketing_action.marketing_action_type.alias');
  const all = ReportUtils.getTableData(report);
  const freeShippingData = ReportUtils.getTableData(
    reportGroupedByAlias[MarketingActionAlias.CONDITIONAL_FREE_SHIPPING]
  );
  const reportData = [all, freeShippingData];
  const reportMetaData = [
    { name: t('all'), showCustomUU: true },
    {
      name: tMarketingAction('conditionalFreeShipping'),
      alias: MarketingActionAlias.CONDITIONAL_FREE_SHIPPING,
      showCustomUU: true,
    },
  ];

  const {
    pathname,
    query: { organizationId, projectId, actionType },
  } = useRouter();

  const headers = [t('measure'), t('numberOfUUsDisplayed'), t('clickedUuRate'), t('cvUuRate')];
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
          <Table.Row key={idx}>
            <Table.Cell className='w-3/6'>
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
            <Table.Cell className='text-right w-1/6'>{item.display_uu}</Table.Cell>
            <Table.Cell className='text-right w-1/6'>{item.click_uu}</Table.Cell>
            <Table.Cell className='w-1/6'>
              <div className='flex'>
                <div className='text-orange'>{t('intermediateCv') + t('colon')}</div>
                <div>{item.cv_uu.custom}</div>
              </div>
              <div className='flex mt-2'>
                <div className='text-primary'>{t('finalCv') + t('colon')}</div>
                <div>
                  <div>{item.cv_uu.final}</div>
                  {/* <div>{item.cvUuRate.finalCv.price}</div> */}
                </div>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
