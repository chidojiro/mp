import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { ReportApis } from './apis';
import { DeliveryType, MarketingActionReport } from './types';

export function useActionsReport(deliveryType: DeliveryType) {
  const { query } = useRouter();

  const swrReturn = useSWR<MarketingActionReport[]>(
    ['/reports', deliveryType, query.targets],
    () =>
      ReportApis.getActions(
        deliveryType,
        query.targets && query.targets !== 'all' ? [query.targets].flat() : undefined
      ),
    {}
  );

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data ?? [] }), [swrReturn]);
}
