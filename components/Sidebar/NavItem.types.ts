import { IconName } from '../common';

export type NavItemData = {
  path?: string;
  label: string;
  children?: NavItemData[];
  matches?: string[];
  icon?: IconName;
};
