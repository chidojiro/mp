import { useServerSidePropsContext } from '@/ssr/ServerSidePropsContext';
import React from 'react';
import useSWR from 'swr';
import { ProfileApis } from './apis';
import { Profile } from './types';

export function useProfile(fallbackData?: Profile) {
  const { props } = useServerSidePropsContext();

  const swrReturn = useSWR<Profile>('/user/me', ProfileApis.get, {
    fallbackData: fallbackData ?? props.profile,
  });

  return React.useMemo(
    () => ({ ...swrReturn, data: swrReturn.data ?? ({} as Profile) }),
    [swrReturn]
  );
}
