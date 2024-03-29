export type ClassName = {
  className?: string;
};

export type Children = {
  children?: React.ReactNode;
};

export type Fn = (...args: any[]) => any;

export type Device = 'mobile' | 'desktop';

export type Option<T = any, P = React.ReactNode> = {
  value: T;
  label: P;
};
