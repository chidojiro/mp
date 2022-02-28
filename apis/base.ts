import axios from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';
import { nanoid } from 'nanoid';
import { API_URI, AUTH_TOKEN } from '@/constants';
import { CookiesUtils } from '@/utils';

axios.defaults.baseURL = API_URI;
axios.defaults.withCredentials = false;
axios.defaults.headers.common = {
  'Content-Type': 'application/json',
};

axiosRetry(axios, {
  retries: 5,
  retryCondition: e => {
    return isNetworkOrIdempotentRequestError(e) || e.response?.status === 502;
  },
  retryDelay: axiosRetry.exponentialDelay,
});

axios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    if (CookiesUtils.get(AUTH_TOKEN)) {
      config.headers.Authorization = `Bearer ${CookiesUtils.get(AUTH_TOKEN)}`;
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

axios.interceptors.response.use();

export default axios;
export const RestApi = axios;
