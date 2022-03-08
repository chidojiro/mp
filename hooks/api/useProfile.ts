import { useServerSidePropsContext } from '@/contexts';
import { ProfileApis } from '@/apis';
import useSWR from 'swr';
import { Profile } from '@/types';

const defaultValue: Profile = {
  created_at: '',
  email: '',
  last_name: '',
  first_name: '',
  updated_at: '',
};

export function useProfile() {
  const { props } = useServerSidePropsContext();
  const { data, mutate, error } = useSWR<Profile | null>('/user/me', ProfileApis.get, {
    fallbackData: props.profile,
  });

  const loading = !data && !error;

  return {
    loading,
    mutate,
    data: data ?? props.profile ?? defaultValue,
    error,
  };
}
