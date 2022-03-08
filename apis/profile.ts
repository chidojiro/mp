import { Profile } from '@/types';
import { RestApi, RestApiConfig } from './base';

const get = async (config?: RestApiConfig) => {
  return RestApi.get<Profile>('/users/me', config);
};

export const ProfileApis = { get };
