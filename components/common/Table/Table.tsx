import React from 'react';

import classNames from 'classnames';

import { Children, ClassName } from 'types';

import { Body } from './Body';
import { Cell } from './Cell';
import { Footer } from './Footer';
import { Head } from './Head';
import { Header } from './Header';
import { Row } from './Row';

type Size = 'sm' | 'md';

const DEFAULT_SIZE: Size = 'md';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
> & {
  size?: Size;
};

type TableProviderValue = {
  size?: Size;
};

export const TableContext = React.createContext<TableProviderValue>({ size: DEFAULT_SIZE });

export const Table = ({ className, size = DEFAULT_SIZE, ...restProps }: Props) => {
  const providerValue = React.useMemo<TableProviderValue>(() => ({ size }), [size]);

  return (
    <TableContext.Provider value={providerValue}>
      <table
        {...restProps}
        className={classNames('mp-table', 'w-full border-collapse table-auto', className)}
      ></table>
    </TableContext.Provider>
  );
};

const OverflowContainer = ({ children, className }: Children & ClassName) => (
  <div className={classNames('max-w-full overflow-auto', className)}>{children}</div>
);

Table.Head = Head;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.Cell = Cell;
Table.Header = Header;
Table.OverflowContainer = OverflowContainer;
