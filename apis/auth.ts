import { ACCESS_TOKEN_KEY } from '@/constants';
import { CookiesUtils } from '@/utils/cookieUtils';

import { RestApi } from './base';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

const login = async (payload: LoginPayload) => {
  const { access_token } = await RestApi.post<LoginResponse>('/auth/login', payload);
  CookiesUtils.set(ACCESS_TOKEN_KEY, access_token);
};

export const AuthApi = { login };
