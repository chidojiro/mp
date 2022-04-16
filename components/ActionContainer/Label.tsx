import classNames from 'classnames';

import { Children, ClassName } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & Children & {};

// eslint-disable-next-line no-empty-pattern
export const Label = ({ className, children }: Props) => {
  return <div className={classNames('text-secondary mr-2', className)}>{children}</div>;
};
