export enum AssetResourceType {
  organization = 'organization',
  project = 'project',
  user = 'user',
  productImport = 'product.import',
  product = 'product',
  marketingAction = 'marketingAction',
}

export type Asset = {
  id: string;
  name: string;
  mime_type: string;
  size: number;
  resource_type: AssetResourceType;
  resource_id?: string;
  path: string;
  status?: string;
  created_at?: string;
};
