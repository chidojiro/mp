import { RestApis } from '../rest/apis';
import { Asset, AssetResourceType } from './types';

const get = (assetId: string) => {
  return RestApis.get<Asset>(`/assets/${assetId}`);
};

const create = (
  file: File,
  resourceType: AssetResourceType,
  resourceID?: string | number,
  params?: Record<string, string | number>
) => {
  const data = new FormData();
  data.append('upload_file', file, file.name);
  let _params: { [key: string]: string | number } = {
    resource_type: resourceType,
    ...params,
  };
  if (resourceID) {
    _params = { ..._params, resource_id: resourceID };
  }
  const config = {
    params: _params,
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  return RestApis.post<Asset>('/assets/', data, config);
};

const remove = (id: string) => {
  return RestApis.delete(`/assets/${id}`);
};

export const AssetApis = { create, get, remove };
