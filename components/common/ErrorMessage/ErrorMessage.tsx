import classNames from 'classnames';

import { Children, ClassName } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & Children & {};

// eslint-disable-next-line no-empty-pattern
export const ErrorMessage = ({ className, ...restProps }: Props) => {
  return <p className={classNames('text-danger', className)} {...restProps}></p>;
};
