import { RestApis } from '@/rest/apis';
import { MarketingActionAlias } from '@/marketing-action/types';
import { Variable } from '@/marketing-action/types';

const list = async (marketingActionAlias: MarketingActionAlias) => {
  return await RestApis.get<Variable[]>(`/variables`, {
    params: { marketing_action_alias: marketingActionAlias },
  });
};

export const VariableApis = {
  list,
};
