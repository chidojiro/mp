import { useRouter } from 'next/router';
import useSWR from 'swr';

import { ProjectApis } from '@/apis';

export const useProject = (_projectId?: string) => {
  const { query } = useRouter();

  const projectId = _projectId ?? (query.projectId as string);

  const swrReturn = useSWR(['/projects', projectId], () => ProjectApis.get(projectId));

  return swrReturn;
};
