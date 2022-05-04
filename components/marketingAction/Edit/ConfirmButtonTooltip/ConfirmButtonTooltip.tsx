import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { Icon } from '@/components/common';
import { VisibilityControl } from '@/hooks';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { control?: VisibilityControl };

// eslint-disable-next-line no-empty-pattern
export const ConfirmButtonTooltip = ({ control }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <div className={classNames('absolute', { hidden: !control?.visible })}>
      <div
        className={classNames(
          'shadow-[2px_4px_6px_0px_#00000029] w-[400px] px-[17px] py-[9px] relative rounded-full bg-primary bottom-16',
          "before:content-[''] before:absolute before:bottom-[-14px] before:right-1/2 before:border-primary",
          'before:w-6 before:h-[15px] before:shadow-[4px_4px_6px_0px_#00000029] before:border-r-[16px] before:border-b-[3px] before:rounded-br-[80px_50px]'
        )}
        onClick={e => e.stopPropagation()}
      >
        <Icon
          onClick={control?.close}
          name='popover-close'
          className='absolute right-[-2px] top-[-5px] w-[18px] rounded-full h-[18px]'
        />
        <div className='font-bold text-white text-regular'>{t('alertConfirm')}</div>
      </div>
    </div>
  );
};
