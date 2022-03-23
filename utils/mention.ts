import { MentionValuePattern } from '@/constants';
import { Option } from '@/types';

const insert = ({ value, label }: Option<string>) => {
  // if (ref.current !== document.activeElement) {
  //   ref.current?.focus();
  //   document.execCommand('selectAll', false, undefined);
  //   document.getSelection()?.collapseToEnd();
  // }

  document.execCommand(
    'insertHTML',
    false,
    `<span contenteditable='false' class='mention-item' data-value=${value}>${label}</span>&#8203;`
  );
};

const toPreviewString = (value: string) => {
  if (typeof value !== 'string') return '';

  return value
    .replaceAll('<br>', '\n')
    .replaceAll('<div>', '')
    .replaceAll('</div>', '')
    .replaceAll('&nbsp;', '')
    .replaceAll(MentionValuePattern, '○○○');
};

export const MentionUtils = { insert, toPreviewString };
