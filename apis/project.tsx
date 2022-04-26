import { ProjectSettingData, ProjectData } from '@/types';

import { RestApi } from './base';

const get = async (projectId: string) => {
  return await RestApi.get<ProjectData>(`/projects/${projectId}`);
};

const updateSetting = async (data: ProjectSettingData) => {
  const { id, ...settings } = data;
  return await RestApi.put(`/projects/${id}`, {
    settings,
  });
};

export const ProjectApis = { get, updateSetting };
