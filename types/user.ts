export type User = {
  first_name?: string;
  last_name?: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
};

export type LoginData = {
  email: string;
  password: string;
};
