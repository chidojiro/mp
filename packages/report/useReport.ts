import React from 'react';
import useSWR from 'swr';
import { ReportApis } from './apis';
import { DeliveryType, MarketingActionReport } from './types';

export function useReport(deliveryType: DeliveryType) {
  const swrReturn = useSWR<MarketingActionReport[]>(
    ['/reports', deliveryType],
    () => ReportApis.getList(deliveryType),
    {}
  );

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data ?? [] }), [swrReturn]);
}
