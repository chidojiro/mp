import React from 'react';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {};

export const Footer = ({ className, ...restProps }: Props) => {
  return <footer {...restProps} className={classNames('mp-table-footer', className)}></footer>;
};
