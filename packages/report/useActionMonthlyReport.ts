import { MarketingActionAliasMap } from '@/marketing-action/types';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { ReportApis } from './apis';
import { MarketingActionMonthlyReport } from './types';

export function useActionMonthlyReport() {
  const { query } = useRouter();

  const swrReturn = useSWR<MarketingActionMonthlyReport[]>(
    ['monthly-reports', query.targets],
    () =>
      ReportApis.getActionMonthly(
        (MarketingActionAliasMap as any)[query.actionType as string],
        query.targets && query.targets !== 'all' ? [query.targets].flat() : undefined
      ),
    {}
  );

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data ?? [] }), [swrReturn]);
}
