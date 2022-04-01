import { MarketingActionRes } from '@/types';
import { RestApi, RestApiConfig } from './base';

const list = (config: RestApiConfig) => {
  return RestApi.get<{ [key: string]: MarketingActionRes[] }>('/actions', config);
};

const get = (marketing_action_id: string) => {
  return RestApi.get<MarketingActionRes>(`/actions/${marketing_action_id}`);
};

export const MarketingActionAPI = { list, get };
