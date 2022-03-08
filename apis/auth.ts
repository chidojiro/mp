import { RestApi } from './base';
import cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '@/constants';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

const login = async (payload: LoginPayload) => {
  const { access_token } = await RestApi.post<LoginResponse>('/login', payload);

  cookies.set(ACCESS_TOKEN_KEY, access_token);
};

export const AuthApi = { login };
