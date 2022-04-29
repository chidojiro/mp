import React from 'react';
import useSWR from 'swr';

import { VariableApis } from '@/apis/variable';
import { MarketingActionAlias } from '@/types/marketingAction';
import { Variable } from '@/types/variable';

export const useVariables = (alias: MarketingActionAlias) => {
  const swrReturn = useSWR<Variable[]>(['/variables', alias], () => VariableApis.list(alias), {
    fallbackData: [],
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
};
