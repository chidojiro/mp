import React from 'react';

import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
  HTMLTableHeaderCellElement
>;

export const Header = ({ className, ...restProps }: Props) => {
  return (
    <th
      {...restProps}
      className={classNames(
        'mp-table-header',
        'text-left text-gray-800',
        'border-r border-b border-solid border-gray-400 last-of-type:border-r-none',
        'py-3 px-6',
        className
      )}
    ></th>
  );
};
