import { ChangePasswordPayload, Profile } from '@/types';

import { RestApi, RestApiConfig } from './base';

const get = (config?: RestApiConfig) => {
  return RestApi.get<Profile>('/users/me', config);
};

const put = (payload: Profile) => {
  return RestApi.put<Profile>('/users/me', payload);
};

interface ChangePasswordData {
  new_password: string;
  old_password: string;
}
const changePassword = (data: ChangePasswordPayload) => {
  return RestApi.put<Profile>('/users/me', {
    new_password: data.newPassword,
    old_password: data.oldPassword,
  } as ChangePasswordData);
};

export const ProfileApis = { get, put, changePassword };
