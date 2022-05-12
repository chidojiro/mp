import classNames from 'classnames';
import { BaseEmoji, Picker } from 'emoji-mart';

import { useVisibilityControl } from '@/hooks';
import { ClassName } from '@/types';

import { Icon } from '../../Icon';
import { Popover } from '../../Popover';

import 'emoji-mart/css/emoji-mart.css';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  onSelect?: (emoji: string) => void;
};

// eslint-disable-next-line no-empty-pattern
export const EmojiSign = ({ className, onSelect }: Props) => {
  const popoverControl = useVisibilityControl();

  const handleEmojiSelect = (emoji: BaseEmoji) => {
    const sym = emoji.unified.split('-');
    const codesArray: any[] = sym.map((el: any) => '0x' + el);
    onSelect?.(String.fromCodePoint(...codesArray));
  };

  return (
    <Popover
      placement='top-start'
      control={popoverControl}
      trigger={
        <div
          className={classNames(
            className,
            'select-none cursor-pointer',
            'rounded border border-solid border-gray-300 w-7 h-7 flex items-center justify-center text-secondary bg-white'
          )}
        >
          <Icon name='emoji' className='w-4 h-4' />
        </div>
      }
    >
      <Picker title=':grinning:' emoji='grinning' onSelect={handleEmojiSelect} />
    </Popover>
  );
};
