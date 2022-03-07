export enum HeaderTab {
  Active = 'active',
  Terminated = 'terminated',
  Draft = 'draft',
}
export interface Step {
  name: string;
  showPreviewBtn?: boolean;
  isDone?: boolean;
  children?: React.ReactNode;
  onConfirm?: () => void;
  onShowPreview?: () => void;
}

export enum MESSAGE_TYPE {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface Message {
  id: number;
  type: MESSAGE_TYPE;
  content?: React.ReactNode;
}
