import { Children, ClassName } from '@/types';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const Section = ({ className, children }: Props) => {
  return (
    <div
      className={classNames(
        'px-10 py-8',
        ' bg-gray-100',
        'first:rounded-tl-lg last:rounded-br-lg',
        'mb-2 last:mb-0',
        className
      )}
    >
      {children}
    </div>
  );
};

const Title = ({ children, className }: Children & ClassName) => (
  <div className={classNames('font-bold mb-2', className)}>{children}</div>
);

const Content = ({ children, className }: Children & ClassName) => (
  <div className={classNames(className)}>{children}</div>
);

Section.Title = Title;
Section.Content = Content;
