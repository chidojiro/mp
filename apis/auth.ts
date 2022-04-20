import { ACCESS_TOKEN_KEY } from '@/constants';
import { CookiesUtils } from '@/utils/cookieUtils';
import axios, { AxiosError } from 'axios';

import { RestApi } from './base';

export type PasswordRecoverPayload = {
  email: string;
};
export type PasswordRecoveryResponse = {
  status: 'error' | 'success';
  error?: {
    code: string;
    msg: string;
  };
};
export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
};

export type NewPasswordPayload = {
  token: string;
  password: string;
};

const login = async (payload: LoginPayload) => {
  const { access_token } = await RestApi.post<LoginResponse>('/auth/login', payload);
  CookiesUtils.set(ACCESS_TOKEN_KEY, access_token);
};
const recoverPassword = async (payload: PasswordRecoverPayload) => {
  try {
    await RestApi.post('/auth/password/recovery', payload);
    return {
      status: 'success',
    };
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 400) {
        // invalid email
        return axiosError.response.data as PasswordRecoveryResponse;
      }
      return {
        status: 'error',
        error: {
          msg: 'unknownError',
        },
      };
    }
  }
};

const verifyToken = async (token: string) => {
  try {
    await RestApi.get(`/auth/password/reset?token=${token}`);
    return true;
  } catch (error) {
    return false;
  }
};

const newPassword = async (payload: NewPasswordPayload) => {
  try {
    const response = await RestApi.post('/auth/password/reset', payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (400 === axiosError.response?.status) {
        return {
          status: 'error',
          error: {
            code: 'invalidToken',
          },
        };
      }
      if (422 === axiosError.response?.status) {
        return {
          status: 'error',
          error: {
            code: 'badRequest',
          },
        };
      }
    }
  }
};
export const AuthApi = { login, recoverPassword, verifyToken, newPassword };
