import React from 'react';
import classNames from 'classnames';

import { Icon } from '@/components/common/Icon';
import { useScrollDisable, VisibilityControl } from '@/hooks';
import { Children } from '@/types';

const headerHeight = '48px';
const sidebarWidth = '200px';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & {
  title?: string;
  control: VisibilityControl;
  showCloseButton?: boolean;
  className?: string;
  onBackdropClick?: () => void;
  onClose?: () => void;
};

// eslint-disable-next-line no-empty-pattern
export const Overlay = ({
  children,
  control,
  title,
  showCloseButton = true,
  className,
  onBackdropClick,
  onClose,
}: Props) => {
  useScrollDisable(control.visible);

  if (!control.visible) return null;

  const handleClose = () => {
    control.close();
    onClose?.();
  };

  return (
    <div
      className={classNames(
        'mp-overlay',
        'fixed bottom-0 right-0 z-50',
        'flex items-center justify-center'
      )}
      style={{ width: `calc(100vw - ${sidebarWidth})`, height: `calc(100vh - ${headerHeight})` }}
    >
      <div onClick={onBackdropClick} className='absolute w-full h-full bg-[#222222]/80'></div>
      <div
        className={classNames(
          'w-full px-5 py-2',
          'text-white text-h5',
          'absolute top-0 left-0',
          'flex items-center justify-between'
        )}
      >
        <h5>{title}</h5>
        {!!showCloseButton && (
          <Icon name='close' className='w-4 h-4 cursor-pointer' onClick={handleClose} />
        )}
      </div>
      <div className={classNames('z-50', className)}>{children}</div>
    </div>
  );
};
