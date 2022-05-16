import React from 'react';

import useSWR from 'swr';
import { ReportNames } from './types';
import { RfmReportDataItem } from './types';
import { ReportApis } from './apis';

export function useReport(reportName: ReportNames, fallbackData?: RfmReportDataItem[]) {
  const swrReturn = useSWR<RfmReportDataItem[]>('/reports/rfm', ReportApis.rfm_report, {
    fallbackData: fallbackData,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
}
