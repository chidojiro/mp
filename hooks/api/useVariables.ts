import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { VariableApis } from '@/apis/variable';
import { Option } from '@/types';
import { MarketingActionAlias } from '@/types/marketingAction';
import { Variable } from '@/types/variable';

const marketingActionQueryParamToAliasMap: Record<string, MarketingActionAlias> = {
  'step-delivery-after-purchase': MarketingActionAlias.AFTER_PURCHASE,
  'cart-abandoned': MarketingActionAlias.CART_LEFT_NOTIFICATION,
  'cart-page-faq': MarketingActionAlias.CART_PAGE_FAQ,
  'conditional-free-shipping': MarketingActionAlias.CONDITIONAL_FREE_SHIPPING,
  'ranking-based-on-overall-purchase-history': MarketingActionAlias.HISTORY_PURCHASE,
  'ranking-by-category': MarketingActionAlias.HISTORY_PURCHASE_CATEGORY,
  'recommendation-diagnosis-bot': MarketingActionAlias.RECOMMEND_DIAGNOSTIC,
};

export const useVariables = (alias?: MarketingActionAlias) => {
  const { query } = useRouter();
  const _alias = alias ?? marketingActionQueryParamToAliasMap[query.marketingActionName as string];
  const swrReturn = useSWR<Variable[]>(['/variables', alias], () => VariableApis.list(_alias), {
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
            value: `{{${data.name}}}`,
          } as Option<string, string>)
      ),
    }),
    [swrReturn]
  );
};
