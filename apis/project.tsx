import { ProjectData, ProjectSettingData } from '@/types';

import { RestApi } from './base';

const get = async (projectId: string) => {
  return RestApi.get<ProjectData>(`/projects/${projectId}`);
};

const update = async (data: ProjectSettingData) => {
  const { id, ...settings } = data;

  return RestApi.put(`/projects/${id}`, {
    settings,
  });
};

export const ProjectApis = { get, update };
