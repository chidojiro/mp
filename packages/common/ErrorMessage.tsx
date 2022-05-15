import classNames from 'classnames';

import { Children, ClassName } from './types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ErrorMessageProps = ClassName & Children & {};

export const ErrorMessage = ({ className, ...restProps }: ErrorMessageProps) => {
  return <p className={classNames('text-danger', className)} {...restProps}></p>;
};
