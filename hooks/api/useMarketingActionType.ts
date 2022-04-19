import React from 'react';

import useSWR from 'swr';

import { ProfileApis } from '@/apis/profile';
import { useServerSidePropsContext } from '@/contexts/ServerSidePropsContext';
import { Profile } from '@/types';

export function useMarketingActionType(fallbackData?: Profile) {
  const { props } = useServerSidePropsContext();

  const swrReturn = useSWR<Profile>('/action_types', ProfileApis.get, {
    fallbackData: fallbackData ?? props.profile,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
}
