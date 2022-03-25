import { MentionValuePattern } from '@/constants';
import { Option } from '@/types';

const insert = ({ value, label }: Option<string>) => {
  document.execCommand(
    'insertHTML',
    false,
    `
    <span class='mention-item--left-zww'>&#8203</span>
    <span class='mention-item--inner' contenteditable=false data-value=${value}>${label}</span>
    <span class='mention-item--right-zww'>&#8203</span>
    `
  );
};

const toPreviewString = (value: string) => {
  if (typeof value !== 'string') return '';

  return value
    .replaceAll(/\s*\n\s*/g, '')
    .replaceAll('<br>', '\n')
    .replaceAll('&#8203;', '')
    .replaceAll('&nbsp;', ' ')
    .replaceAll(MentionValuePattern, '○○○')
    .replaceAll(/<span[^<]*>/g, '')
    .replaceAll(/<\/span[^<]*>/g, '');
};

export const MentionUtils = { insert, toPreviewString };
