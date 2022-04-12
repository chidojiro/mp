import React from 'react';

import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const Head = ({ className, ...restProps }: Props) => {
  return (
    <thead
      {...restProps}
      className={classNames('mp-table-head', 'text-center bg-secondary text-white', className)}
    ></thead>
  );
};
