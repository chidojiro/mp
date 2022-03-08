import Cookies, { CookieAttributes } from 'js-cookie';
import { isSafari } from 'react-device-detect';
import { IS_DEV } from '@/constants';

const getKeyWithPrefix = (key: string, isSecure?: boolean) => {
  const prefix = (() => {
    if (IS_DEV) return '';

    return isSecure ? '__Secure-' : '__Host-';
  })();

  return `${prefix}${key}`;
};

const set = (key: string, value: string, options: CookieAttributes = {}) => {
  const sameSite = isSafari ? 'Lax' : 'Strict';
  Cookies.set(key, value, { secure: !IS_DEV, sameSite, ...options });
};

const get = (key: string, defaultValue = '') => {
  return Cookies.get(key) ?? defaultValue;
};

const remove = (key: string, options: CookieAttributes = {}) => {
  Cookies.remove(key, { ...options, secure: !IS_DEV });
};

export const CookiesUtils = {
  set,
  get,
  remove,
  getKeyWithPrefix,
};
