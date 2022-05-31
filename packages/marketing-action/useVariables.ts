import { Option } from '@/common/types';
import { ProjectApis } from '@/project/apis';
import { Attribute } from '@/project/types';
import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { MarketingActionAlias } from './types';

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
  const swrReturn = useSWR<Attribute[]>(
    ['/variables', alias],
    () => ProjectApis.listAttributes(query.projectId as string, _alias),
    {
      fallbackData: [],
    }
  );

  return React.useMemo(
    () => ({
      ...swrReturn,
      data: swrReturn.data!,
      variablesAsMentionOptions: swrReturn.data!.map(
        data =>
          ({
            label: data.label,
            value: `{{${data.name}}}`,
          } as Option<string, string>)
      ),
    }),
    [swrReturn]
  );
};
