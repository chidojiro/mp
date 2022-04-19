import { MarketingActionAlias as MAAlias } from '@/types';

export interface Step {
  id: number;
  name: string;
  showPreviewBtn?: boolean;
  isDone?: boolean;
  children?: React.ReactNode;
  methods?: any;
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
  red: '#E22B2D',
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

export const MARKETING_ACTION_URL: { [key: string]: any } = {
  [MAAlias.CART_LEFT_NOTIFICATION]: {
    path: 'cart-abandoned',
    icon: 'cart',
  },
  [MAAlias.AFTER_PURCHASE]: {
    path: 'step-delivery-after-purchase',
    icon: 'mails',
  },
  [MAAlias.HISTORY_PURCHASE]: {
    path: 'ranking-based-on-overall-purchase-history',
    icon: 'ranking',
  },
  [MAAlias.HISTORY_PURCHASE_CATEGORY]: {
    path: 'ranking-by-category',
    icon: 'ranking-by-category',
  },
  [MAAlias.CONDITIONAL_FREE_SHIPPING]: {
    path: 'conditional-free-shipping',
    icon: 'free-shipping',
  },
  [MAAlias.RECOMMEND_DIAGNOSTIC]: {
    path: 'recommendation-diagnosis-bot',
    icon: 'chatbot',
  },
  [MAAlias.CART_PAGE_FAQ]: {
    path: 'cart-page-faq',
    icon: 'cart-question',
  },
};
