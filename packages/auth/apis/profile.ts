import { RestApiConfig, RestApis } from '@/rest/apis';
import { ChangePasswordPayload, Profile } from '../types';

const get = (config?: RestApiConfig) => {
  return RestApis.get<Profile>('/users/me', config);
};

const put = (payload: Profile) => {
  return RestApis.put<Profile>('/users/me', payload);
};

interface ChangePasswordData {
  new_password: string;
  old_password: string;
}
const changePassword = (data: ChangePasswordPayload) => {
  return RestApis.put<Profile>('/users/me', {
    new_password: data.newPassword,
    old_password: data.oldPassword,
  } as ChangePasswordData);
};

export const ProfileApis = { get, put, changePassword };
