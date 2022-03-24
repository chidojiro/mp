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
            'w-fit cursor-pointer bg-white py-2 px-2.5 flex items-center rounded border border-input select-none',
            className
          )}
        >
          <Icon name='emoji' className='w-4 h-3.5 mr-1 text-secondary' />
          <span className='text-medium text-gray-dark'>{t('emoji')}</span>
        </div>
      }
    >
      <Picker title=':grinning:' emoji='grinning' onSelect={handleEmojiSelect} />
    </Popover>
  );
};
