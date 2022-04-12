import React from 'react';

import useSWR from 'swr';

import { ReportApi } from '@/apis/report';
import { ReportNames, RfmReportDataItem } from '@/types';

export function useReportData(reportName: ReportNames, fallbackData?: RfmReportDataItem[]) {
  const swrReturn = useSWR<RfmReportDataItem[]>('/reports/rfm', ReportApi.rfm_report, {
    fallbackData: fallbackData,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
}
