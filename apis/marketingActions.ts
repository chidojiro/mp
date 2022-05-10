import { MarketingActionRes,TestDelivery } from '@/types';
import { Logger } from '@/utils/Logger';

import { RestApi, RestApiConfig } from './base';

const list = (config: RestApiConfig) => {
  return RestApi.get<{ [key: string]: MarketingActionRes[] }>('/actions', config);
};
type Status = 'running' | 'complete' | 'draft';
export type ActionsByAliasResponse = Record<Status, MarketingActionRes[]>;
const getActionsByAlias = async (alias: string): Promise<ActionsByAliasResponse | null> => {
  try {
    const response = await RestApi.get('/actions', {
      params: {
        alias,
      },
    });
    return response;
  } catch (error) {
    Logger.log('error:', JSON.stringify(error));
  }
  return null;
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

const remove = (id: string) => {
  return RestApi.delete(`/actions/${id}`);
};

const deliveryTestMail = (payload: TestDelivery) => {
  return RestApi.post('/delivery', payload);
};

export const MarketingActionAPI = {
  list,
  create,
  update,
  get,
  remove,
  getActionsByAlias,
  deliveryTestMail,
};
