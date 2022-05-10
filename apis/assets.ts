import { Asset } from '@/types';

import { AssetResourceType } from './../types/asset';
import { RestApi } from './base';

const get = (assetId: string) => {
  return RestApi.get<Asset>(`/assets/${assetId}`);
};
const create = (file: File, resourceType: AssetResourceType, resourceID?: string | number) => {
  const data = new FormData();
  data.append('upload_file', file, file.name);
  let params: { [key: string]: string | number } = {
    resource_type: resourceType,
  };
  if (resourceID) {
    params = { ...params, resource_id: resourceID };
  }
  const config = {
    params,
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  return RestApi.post<Asset>('/assets/', data, config);
};

const remove = (id: string) => {
  return RestApi.delete(`/assets/${id}`);
};

export const AssetAPI = { create, get, remove };
