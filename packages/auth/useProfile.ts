import React from 'react';
import useSWR from 'swr';
import { useServerSidePropsContext } from '@/ssr/ServerSidePropsContext';
import { Profile } from './types';
import { ProfileApis } from '@/auth/apis';

export function useProfile(fallbackData?: Profile) {
  const { props } = useServerSidePropsContext();

  const swrReturn = useSWR<Profile>('/user/me', ProfileApis.get, {
    fallbackData: fallbackData ?? props.profile,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
}
