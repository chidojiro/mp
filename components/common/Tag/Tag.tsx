import { Children, ClassName } from '@/types';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & Children & { size?: 'md' | 'lg' };

// eslint-disable-next-line no-empty-pattern
export const Tag = ({ className, children, size = 'md' }: Props) => {
  return (
    <div
      className={classNames(
        'mp-tag',
        'rounded-full bg-gray-200 text-medium-sm w-fit text-gray-600',
        'flex items-center',
        { 'px-2 py-1': size === 'md', 'px-3 py-1.5': size === 'lg' },
        className
      )}
    >
      {children}
    </div>
  );
};
