export enum HeaderTab {
  Active = 'active',
  Terminated = 'terminated',
  Draft = 'draft',
}

export interface Step {
  name: string;
  showButton?: boolean;
  isDone?: boolean;
  children?: React.ReactNode;
}
