import { Logger } from '@/common/utils';
import { RestApiConfig, RestApis } from '@/rest/apis';
import { MarketingActionRes, TestDelivery } from '../types';

const list = (config: RestApiConfig) => {
  return RestApis.get<{ [key: string]: MarketingActionRes[] }>('/actions', config);
};
type Status = 'running' | 'complete' | 'draft';
export type ActionsByAliasResponse = Record<Status, MarketingActionRes[]>;
const getActionsByAlias = async (alias: string): Promise<ActionsByAliasResponse | null> => {
  try {
    const response = await RestApis.get('/actions', {
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
  return RestApis.post<MarketingActionRes>('/actions', payload);
};

const update = (id: string, payload: any) => {
  return RestApis.put<MarketingActionRes>(`/actions/${id}`, payload);
};

const get = (id: string) => {
  return RestApis.get<MarketingActionRes>(`/actions/${id}`);
};

const remove = (id: string) => {
  return RestApis.delete(`/actions/${id}`);
};

const deliveryTestMail = (payload: TestDelivery) => {
  return RestApis.post('/delivery', payload);
};

export const MarketingActionApis = {
  list,
  create,
  update,
  get,
  remove,
  getActionsByAlias,
  deliveryTestMail,
};
