import { Button, ButtonProps } from '@/common/Button';
import { Icon } from '@/common/Icon';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import classNames from 'classnames';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ButtonProps & { tooltipContent?: React.ReactNode };

// eslint-disable-next-line no-empty-pattern
export const ConfirmButton = ({ children, tooltipContent, onClick, ...restProps }: Props) => {
  const buttonRef = React.useRef<any>(null);
  const openControl = useVisibilityControl({ defaultVisible: !!tooltipContent });
  const appearControl = useVisibilityControl({ defaultVisible: !!openControl.open });

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => appearControl.set(entries[0].isIntersecting),
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    observer.observe(buttonRef.current);
  }, [appearControl]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
    openControl.close();
    onClick?.(e);
  };

  return (
    <div className={classNames('relative select-none transition-all')}>
      {openControl.visible && tooltipContent && (
        <div
          className={classNames(
            'absolute transform -translate-x-1/2 -translate-y-full -top-5 left-1/2 transition-all duration-500',
            'py-2 px-4 rounded-full whitespace-nowrap bg-primary text-white shadow-[2px_4px_6px_0px_#00000029]',
            "before:content-[''] before:absolute before:bottom-[-14px] before:right-1/2 before:border-primary",
            'before:w-6 before:h-[15px] before:shadow-[4px_4px_6px_0px_#00000029] before:border-r-[16px] before:border-b-[3px] before:rounded-br-[80px_50px]',
            {
              'opacity-0': !appearControl.visible,
            }
          )}>
          {tooltipContent}
          <Icon
            onClick={openControl?.close}
            name='popover-close'
            className='cursor-pointer absolute right-[-2px] top-[-5px] w-[18px] rounded-full h-[18px]'
          />
        </div>
      )}
      <Button ref={buttonRef} className='relative w-full' onClick={handleClick} {...restProps}>
        {children}
      </Button>
    </div>
  );
};
