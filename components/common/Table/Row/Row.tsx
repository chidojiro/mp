import React from 'react';

import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export const Row = ({ className, ...restProps }: Props) => {
  return <tr {...restProps} className={classNames('mp-table-row', className)}></tr>;
};
