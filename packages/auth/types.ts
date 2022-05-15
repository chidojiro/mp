export type Profile = {
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  organization_id: string;
  project_id: string;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation?: string;
};
