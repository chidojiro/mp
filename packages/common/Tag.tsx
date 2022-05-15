import classNames from 'classnames';

import { Children, ClassName } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TagProps = ClassName & Children & { size?: 'md' | 'lg' };

// eslint-disable-next-line no-empty-pattern
export const Tag = ({ className, children, size = 'md' }: TagProps) => {
  return (
    <div
      className={classNames(
        'mp-tag',
        'rounded-full bg-gray-200 text-medium-sm font-bold w-fit text-gray-600',
        'flex items-center',
        { 'px-2 py-1': size === 'md', 'px-3 py-1.5': size === 'lg' },
        className
      )}
    >
      {children}
    </div>
  );
};
