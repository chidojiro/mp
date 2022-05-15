import axios, { AxiosError } from 'axios';

import { Logger } from '@/common/utils';
import { CookiesUtils } from '@/common/utils';
import { ACCESS_TOKEN_KEY } from '@/env/constants';
import { RestApis } from '@/rest/apis';

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
  const { access_token } = await RestApis.post<LoginResponse>('/auth/login', payload);
  CookiesUtils.set(ACCESS_TOKEN_KEY, access_token);
};
const recoverPassword = async (payload: PasswordRecoverPayload) => {
  try {
    await RestApis.post('/auth/password/recovery', payload);
    return {
      status: 'success',
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      error: {
        msg: 'unknownError',
      },
    };
  }
};

const verifyToken = async (token: string) => {
  try {
    await RestApis.get(`/auth/password/reset?token=${token}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 204) {
        return true;
      }
    }
    Logger.log('error:', JSON.stringify((error as AxiosError).response));
    return false;
  }
};

const newPassword = async (payload: NewPasswordPayload) => {
  try {
    const response = await RestApis.post('/auth/password/reset', payload);
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
export const AuthApis = { login, recoverPassword, verifyToken, newPassword };
