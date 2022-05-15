import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';
import { nanoid } from 'nanoid';

import { ORANIZATION_HEADER, PROJECT_HEADER } from '@/auth/constants';
import { CookiesUtils, DomUtils, Logger } from '@/common/utils';
import { ACCESS_TOKEN_KEY, API_URI } from '@/env/constants';

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
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    let accessTokenFromReq = null;
    if (config.headers) {
      // extract token from cookies
      const cookiesFromReq = CookiesUtils.parse(config.headers.cookie as string);
      accessTokenFromReq = cookiesFromReq[ACCESS_TOKEN_KEY];
    } else {
      config.headers = {};
    }

    const accessToken = accessTokenFromReq ?? CookiesUtils.get(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // config.headers['X-Frontend-Version'] = `${APP_VERSION}_${BUILD_NUMBER}`
    config.headers['X-Request-Id'] = nanoid(32);
    if (config.method === 'post') {
      config.headers['X-Idempotent-Key'] = nanoid(32);
    }

    if (CookiesUtils.get(ORANIZATION_HEADER)) {
      config.headers[ORANIZATION_HEADER] = CookiesUtils.get(ORANIZATION_HEADER);
    }
    if (CookiesUtils.get(PROJECT_HEADER)) {
      config.headers[PROJECT_HEADER] = CookiesUtils.get(PROJECT_HEADER);
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
    // save ORGANIATION_HEADER and PROJECT_HEADER to cookies
    if (response.headers[ORANIZATION_HEADER]) {
      CookiesUtils.set(ORANIZATION_HEADER, response.headers[ORANIZATION_HEADER]);
    }
    // save PROJECT_HEADER to cookies
    if (response.headers[PROJECT_HEADER]) {
      CookiesUtils.set(PROJECT_HEADER, response.headers[PROJECT_HEADER]);
    }
    return response.data.result ?? response.data.results ?? response.data.data ?? response.data;
  },
  function (error: AxiosError) {
    Logger.log('error:', JSON.stringify(error?.response?.data));
    if (
      [401, 403].includes(error?.response?.status ?? 200) &&
      !DomUtils.isServer() &&
      location.pathname !== '/login'
    )
      location.href = '/login';
    return Promise.reject(error);
  }
);

export const RestApis = myAxios;

export type RestApiConfig = AxiosRequestConfig;
