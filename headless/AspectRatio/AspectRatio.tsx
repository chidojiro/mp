import React from 'react';
import classNames from 'classnames';

export type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  children?: React.ReactNode;
  ratio: `${number}-${number}`;
  className?: string;
};

export const AspectRatio = ({ ratio, children, className, ...restProps }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [x, y] = (ratio?.split('-') || []).map(v => +v);

  if (!/^\d+-\d+$/.test(ratio) || y <= 0) throw new Error('Invalid ratio!');

  return ratio === null ? (
    <>{children}</>
  ) : (
    <div className={classNames('aspect-ratio', 'relative w-full h-fit', className)} {...restProps}>
      <div style={{ paddingTop: (y / x) * 100 + '%' }} ref={ref} data-testid='space-holder'></div>
      <div className='absolute top-0 left-0 w-full h-full'>{children}</div>
    </div>
  );
};
