import { RestApis } from '@/rest/apis';
import { ProjectData, ProjectSettingData } from './types';

const get = async (projectId: string) => {
  return RestApis.get<ProjectData>(`/projects/${projectId}`);
};

const update = async (data: ProjectSettingData) => {
  const { id, ...settings } = data;

  return RestApis.put(`/projects/${id}`, {
    settings,
  });
};

export const ProjectApis = { get, update };
