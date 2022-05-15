import { Icon } from '@/common/Icon';
import { Children } from '@/common/types';
import { useVisibilityControl, VisibilityControl } from '@/common/useVisibilityControl';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & { control?: VisibilityControl };

// eslint-disable-next-line no-empty-pattern
export const ConfirmButtonTooltip = ({ children, control: controlProp }: Props) => {
  const ownControl = useVisibilityControl({ defaultVisible: true });
  const control = controlProp ?? ownControl;

  if (!control.visible) return null;

  return (
    <div className='relative'>
      <div
        className={classNames(
          'absolute transform -translate-x-1/2 -translate-y-full -top-5 left-1/2',
          'py-2 px-4 rounded-full whitespace-nowrap bg-primary text-white shadow-[2px_4px_6px_0px_#00000029]',
          "before:content-[''] before:absolute before:bottom-[-14px] before:right-1/2 before:border-primary",
          'before:w-6 before:h-[15px] before:shadow-[4px_4px_6px_0px_#00000029] before:border-r-[16px] before:border-b-[3px] before:rounded-br-[80px_50px]'
        )}
      >
        {children}
        <Icon
          onClick={control?.close}
          name='popover-close'
          className='cursor-pointer absolute right-[-2px] top-[-5px] w-[18px] rounded-full h-[18px]'
        />
      </div>
    </div>
  );
};
