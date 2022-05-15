import classNames from 'classnames';
import { Children, ClassName } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const Section = ({ className, children }: Props) => {
  return (
    <div
      className={classNames(
        'px-10 py-8',
        ' bg-gray-A100',
        'first-of-type:rounded-t-lg last-of-type:rounded-b-lg',
        'mb-1 last:mb-0',
        className
      )}
    >
      {children}
    </div>
  );
};

const Title = ({ children, className }: Children & ClassName) => (
  <div className={classNames('font-bold mb-2', 'flex items-center gap-2', className)}>
    {children}
  </div>
);

const Description = ({ children, className }: Children & ClassName) => (
  <div className={classNames('text-gray-700 text-medium mb-5', className)}>{children}</div>
);

const Content = ({ children, className }: Children & ClassName) => (
  <div className={classNames(className)}>{children}</div>
);

Section.Title = Title;
Section.Content = Content;
Section.Description = Description;
