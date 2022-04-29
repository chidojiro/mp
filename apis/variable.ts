import { MarketingActionAlias } from '@/types/marketingAction';
import { Variable } from '@/types/variable';

import { RestApi } from './base';

const list = async (marketingActionAlias: MarketingActionAlias) => {
  return await RestApi.get<Variable[]>(`/variables`, {
    params: { marketing_action_alias: marketingActionAlias },
  });
};

export const VariableApis = {
  list,
};
