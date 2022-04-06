export type NavItemData = {
  path?: string;
  label: string;
  children?: NavItemData[];
  matches?: string[];
};
