import { useServerSidePropsContext } from '@/contexts';
import { ProfileApis } from '@/apis';
import useSWR from 'swr';
import { Profile } from '@/types';
import React from 'react';

export function useProfile() {
  const { props } = useServerSidePropsContext();

  const swrReturn = useSWR<Profile>('/user/me', ProfileApis.get, {
    fallbackData: props.profile,
  });

  return React.useMemo(() => ({ ...swrReturn, data: swrReturn.data! }), [swrReturn]);
}
