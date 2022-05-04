import React from 'react';

export type Option<T = any, P = React.ReactNode> = {
  value: T;
  label: P;
};

export type MentionData = {
  name: string;
  content: string;
  type: string;
};
