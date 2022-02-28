import { useScrollDisable, useVisibilityControl, VisibilityControl } from '@/hooks';
import { Children } from '@/types';
import classNames from 'classnames';
import React from 'react';

const headerHeight = '48px';
const sidebarWidth = '200px';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & {
  title: string;
  control?: VisibilityControl;
};

// eslint-disable-next-line no-empty-pattern
export const Overlay = ({ children, control: controlProp, title }: Props) => {
  useScrollDisable(true);

  const ownControl = useVisibilityControl();

  const control = controlProp ?? ownControl;

  if (!control.visible) return null;

  return (
    <div
      className={classNames(
        'mp-overlay bg-[#222222] opacity-80',
        'absolute top-0 left-0 z-50',
        'flex items-center justify-center'
      )}
      style={{ width: `calc(100vw - ${sidebarWidth})`, height: `calc(100vh - ${headerHeight})` }}>
      <div
        className={classNames(
          'w-full px-5 py-2 text-white text-h5',
          'absolute top-0 left-0',
          'flex items-center justify-between'
        )}>
        <div>{title}</div>
        <div className='w-4 h-4 cursor-pointer' onClick={control.close}>
          X
        </div>
      </div>

      <div className=''></div>
      {children}
    </div>
  );
};
