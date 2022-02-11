import classNames from 'classnames';
import React from 'react';

export type Props = React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;

export const Cell = ({ className, ...restProps }: Props) => {
  return (
    <td
      {...restProps}
      className={classNames(
        'mp-table-cell',
        'border-r border-b border-solid border-gray-400 last-of-type:border-r-none',
        'py-3 px-6',
        className
      )}></td>
  );
};
