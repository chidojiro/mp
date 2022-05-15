import { CookiesUtils } from '@/common/utils';
import { ACCESS_TOKEN_KEY } from '@/env/constants';

import { ORANIZATION_HEADER, PROJECT_HEADER } from './constants';

export const useAuth = () => {
  return {
    isAuthenticated: CookiesUtils.get(ACCESS_TOKEN_KEY) !== '',
    organizationId: CookiesUtils.get(ORANIZATION_HEADER),
    projectId: CookiesUtils.get(PROJECT_HEADER),
    logout: () => {
      CookiesUtils.remove(ACCESS_TOKEN_KEY);
      CookiesUtils.remove(ORANIZATION_HEADER);
      CookiesUtils.remove(PROJECT_HEADER);
    },
  };
};
