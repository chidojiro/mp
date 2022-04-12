import { ACCESS_TOKEN_KEY, ORANIZATION_HEADER, PROJECT_HEADER } from '@/constants';
import { CookiesUtils } from '@/utils';

export const useAuth = () => {
  return {
    isAuthenticated: CookiesUtils.get(ACCESS_TOKEN_KEY) !== '',
    organizationId: CookiesUtils.get(ORANIZATION_HEADER),
    projectId: CookiesUtils.get(PROJECT_HEADER),
  };
};
