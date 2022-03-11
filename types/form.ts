import React from 'react';

export type Option<T = any, P = React.ReactNode> = {
  value: T;
  label: P;
};
