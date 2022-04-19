import { MarketingActionRes } from '@/types';

import { RestApi, RestApiConfig } from './base';

const list = (config: RestApiConfig) => {
  return RestApi.get<{ [key: string]: MarketingActionRes[] }>('/actions', config);
};

const create = (payload: any) => {
  return RestApi.post<MarketingActionRes>('/actions', payload);
};

const update = (id: string, payload: any) => {
  return RestApi.put<MarketingActionRes>(`/actions/${id}`, payload);
};

const get = (id: string) => {
  return RestApi.get<MarketingActionRes>(`/actions/${id}`);
};

export const MarketingActionAPI = { list, create, update, get };
