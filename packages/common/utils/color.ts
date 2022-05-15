import { CHAT_COLORS, MESSAGE_COLORS } from '@/marketing-action/constants';

const getName = (color: string, isChat?: boolean) => {
  const _COLORS = isChat ? CHAT_COLORS : MESSAGE_COLORS;
  return Object.keys(_COLORS).find(key => _COLORS[key] === color) || 'skyBlue';
};

export const ColorUtils = { getName };
