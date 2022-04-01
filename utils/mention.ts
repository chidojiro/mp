import { MentionValuePattern } from '@/constants';
import { Option } from '@/types';

const insert = ({ value, label }: Option<string>) => {
  document.execCommand(
    'insertHTML',
    false,
    `<span class='caret-holder'></span><span class='mention-item' contenteditable=false data-value=${value}>${label}</span><span class='caret-holder'></span>`
  );
};

const toPreviewString = (value: string) => {
  if (typeof value !== 'string') return '';

  return value
    .replace(/\s*\n\s*/g, '')
    .replace(/<br>/g, '\n')
    .replace(/&#8203;/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(MentionValuePattern, '○○○')
    .replace(/<span[^<]*>/g, '')
    .replace(/<\/span[^<]*>/g, '');
};

export const MentionUtils = { insert, toPreviewString };
