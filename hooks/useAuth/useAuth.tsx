import { ACCESS_TOKEN_KEY } from '@/constants';
import { CookiesUtils } from '@/utils';

export const useAuth = () => {
  return {
    isAuthenticated: CookiesUtils.get(ACCESS_TOKEN_KEY) !== '',
  };
};
