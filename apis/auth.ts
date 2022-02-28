import { RestApi } from './base';
import { LoginData, User } from '@/types';

export const AuthApi = {
  login: async (payload: LoginData): Promise<any> => {
    return await RestApi.post('login', payload);
  },
};
