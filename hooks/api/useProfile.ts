import { useServerSidePropsContext } from '@/contexts';
import { ProfileApis } from '@/apis';
import useSWR from 'swr';
import { Profile } from '@/types';
import React from 'react';

export function useProfile(fallbackData?: Profile) {
  const { props } = useServerSidePropsContext();

  const swrReturn = useSWR<Profile>('/user/me', ProfileApis.get, {
    fallbackData: fallbackData ?? props.profile,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
}
