export interface Step {
  id: number;
  name: string;
  showPreviewBtn?: boolean;
  isDone?: boolean;
  children?: React.ReactNode;
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

export const MESSAGE_COLORS: { [key: string]: string } = {
  orange: '#ffBA00',
  skyBlue: '#55C5D9',
  pink: '#F594AE',
  mintGreen: '#68CE97',
  red: '#E63E28',
  blue: '#2167C6',
  navy: '#273A71',
  brown: '#81563C',
};

export const CHAT_COLORS: { [key: string]: string } = {
  red: '#81563C',
  skyBlue: '#55C5D9',
  orange: '#ED6A00',
  green: '#4DAB16',
  purple: '#AA187C',
  pink: '#EC307B',
  gray: '#575656',
  navy: '#052274',
  brown: '#905900',
  kaki: '#838221',
  yellow: '#F9D616',
  white: '#FFFFFF',
};
