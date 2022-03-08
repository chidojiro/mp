import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';
import { nanoid } from 'nanoid';
import { API_URI, ACCESS_TOKEN_KEY } from '@/constants';
import { CookiesUtils, NextUtils } from '@/utils';

const myAxios = axios.create({
  baseURL: API_URI,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosRetry(myAxios, {
  retries: 5,
  retryCondition: e => {
    return isNetworkOrIdempotentRequestError(e) || e.response?.status === 502;
  },
  retryDelay: axiosRetry.exponentialDelay,
});

myAxios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    const cookiesFromReq = CookiesUtils.parse(config.headers.cookie);
    const accessTokenFromReq = cookiesFromReq[ACCESS_TOKEN_KEY];
    const accessToken = accessTokenFromReq ?? CookiesUtils.get(ACCESS_TOKEN_KEY);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // config.headers['X-Frontend-Version'] = `${APP_VERSION}_${BUILD_NUMBER}`
    config.headers['X-Request-Id'] = nanoid(32);
    if (config.method === 'post') {
      config.headers['X-Idempotent-Key'] = nanoid(32);
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

myAxios.interceptors.response.use(
  function (response) {
    return response?.data?.result ?? response?.data?.results ?? response?.data;
  },
  function (error) {
    if (error.response.status === 401 && !NextUtils.isServer()) location.href = '/login';
    return Promise.reject(error);
  }
);

export const RestApi = myAxios;

export type RestApiConfig = AxiosRequestConfig;
