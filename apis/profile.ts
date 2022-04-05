import { Profile } from '@/types';

import { RestApi, RestApiConfig } from './base';

const get = (config?: RestApiConfig) => {
  return RestApi.get<Profile>('/users/me', config);
};

const put = (payload: Profile) => {
  return RestApi.put<Profile>('/users/me', payload);
};

export const ProfileApis = { get, put };
