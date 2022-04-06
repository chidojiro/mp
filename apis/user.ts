import { User } from '@/types';

import { RestApi } from './base';

export const UserApi = {
  me: async (): Promise<User | null> => {
    const resp = await RestApi.get('users/me');

    return resp.data.result;
  },
};
