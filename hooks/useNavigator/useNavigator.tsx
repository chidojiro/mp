import { useRouter } from 'next/router';

import { ORANIZATION_HEADER } from '@/constants/auth';
import { CookiesUtils } from '@/utils/cookieUtils';
import { Navigator } from '@/types';

export const useNavigator = (): Navigator => {
  const router = useRouter();
  const openDashboard = async () => {
    await router.push(getDashboardPage());
  };

  const getDashboardPage = () => {
    const orgId = CookiesUtils.get(ORANIZATION_HEADER);
    return `/organizations/${orgId}/dashboard`;
  };

  const result: Navigator = {
    openDashboard,
    getDashboardPage,
  };

  return result;
};

export default useNavigator;
