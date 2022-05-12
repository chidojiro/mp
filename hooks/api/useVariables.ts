import React from 'react';
import useSWR from 'swr';

import { VariableApis } from '@/apis/variable';
import { Option } from '@/types';
import { MarketingActionAlias } from '@/types/marketingAction';
import { Variable } from '@/types/variable';

export const useVariables = (alias: MarketingActionAlias) => {
  const swrReturn = useSWR<Variable[]>(['/variables', alias], () => VariableApis.list(alias), {
    fallbackData: [],
  });

  return React.useMemo(
    () => ({
      ...swrReturn,
      data: swrReturn.data!,
      variablesAsMentionOptions: swrReturn.data!.map(
        data =>
          ({
            label: data.name_display,
            value: data.type === 'dynamic' ? `{{${data.name}}}` : data.content,
          } as Option<string, string>)
      ),
    }),
    [swrReturn]
  );
};
