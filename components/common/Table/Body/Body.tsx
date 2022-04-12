import React from 'react';

import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const Body = ({ className, ...restProps }: Props) => {
  return (
    <tbody
      {...restProps}
      className={classNames('mp-table-body', 'border-l border-solid border-gray-400', className)}
    ></tbody>
  );
};
