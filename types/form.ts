import React from 'react';

export type Option<T = any, P = React.ReactNode> = {
  value: T;
  label: P;
};

export type RichOption<T> = Option<string, string> & {
  data?: T;
};
