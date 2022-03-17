import { Profile } from '@/types';
import { RestApi, RestApiConfig } from './base';

const mockProfile = {
  email: 'sample@resola.ai',
} as Profile;

const get = async (config?: RestApiConfig) => {
  return mockProfile;
  // return RestApi.get<Profile>('/users/me', config);
};

export const ProfileApis = { get };
