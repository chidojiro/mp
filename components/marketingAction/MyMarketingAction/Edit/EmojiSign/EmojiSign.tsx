import { Icon } from '@/components';
import { Popover } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { ClassName } from '@/types';
import classNames from 'classnames';
import { BaseEmoji, Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  onSelect?: (emoji: string) => void;
};

// eslint-disable-next-line no-empty-pattern
export const EmojiSign = ({ className, onSelect }: Props) => {
  const { t } = useTranslation('marketingAction');
  const popoverControl = useVisibilityControl();

  const onSelectEmoji = (emoji: BaseEmoji) => {
    const sym = emoji.unified.split('-');
    const codesArray: any = [];
    sym.forEach((el: any) => codesArray.push('0x' + el));
    onSelect?.(String.fromCodePoint(...codesArray));
  };

  return (
    <Popover
      placement='right-start'
      control={popoverControl}
      trigger={
        <div className={classNames('py-2 px-2.5', 'select-none', className)}>
          <Icon name='emoji' className='w-[15px] h-[15px] mr-1 text-gray-700' />
        </div>
      }
    >
      <Picker title=':grinning:' emoji='grinning' onSelect={onSelectEmoji} />
    </Popover>
  );
};
