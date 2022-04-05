import { MarketingActionRes } from '@/types';
import { RestApi, RestApiConfig } from './base';

const list = (config: RestApiConfig) => {
  return RestApi.get<{ [key: string]: MarketingActionRes[] }>('/actions', config);
};

export const MarketingActionAPI = { list };
