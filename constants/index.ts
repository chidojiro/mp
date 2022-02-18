export const APP_STORAGE_PREFIX = 'MP_APP_STORAGE:';
export const AUTH_TOKEN = `${APP_STORAGE_PREFIX}token`;
export const IS_DEV = process.env.NODE_ENV === 'development';
export const API_URI = process.env.NEXT_PUBLIC_API_URI;
export * from './marketing_action';

export const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
