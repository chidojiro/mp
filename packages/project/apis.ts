import { MarketingActionAlias } from '@/marketing-action/types';
import { RestApis } from '@/rest/apis';
import { Attribute, ProjectData, ProjectSettingData } from './types';

const get = async (projectId: string) => {
  return RestApis.get<ProjectData>(`/projects/${projectId}`);
};

const update = async (data: ProjectSettingData) => {
  const { id, ...settings } = data;

  return RestApis.put(`/projects/${id}`, {
    settings,
  });
};

const listAttributes = async (project_id: string, marketing_action_alias: MarketingActionAlias) => {
  return await RestApis.get<Attribute[]>(`/projects/${project_id}/attributes/`, {
    params: { marketing_action_alias },
  });
};

export const ProjectApis = { get, update, listAttributes };
