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
        'text-left text-white',
        'first:border-l-0 first:rounded-tl-md',
        'last:border-r-0 last:rounded-tr-md',
        'bg-secondary border-white',
        'border-r border-b border-solid border-1',
        'py-3 px-6',
        className
      )}
    ></th>
  );
};
