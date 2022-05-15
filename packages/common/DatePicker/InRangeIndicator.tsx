import React from 'react';
import classNames from 'classnames';
import { getDay, isWithinInterval } from 'date-fns';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  date: Date;
  dateRange?: Date[];
  activeClassName: string;
};

export const InRangeIndicator = ({
  date,
  dateRange,
  activeClassName,
  className,
  ...restProps
}: Props) => {
  const isDateActive = () => {
    if (!dateRange?.length) return false;

    if (dateRange?.length === 1) return date === dateRange[0];

    return isWithinInterval(new Date(date), {
      start: new Date(dateRange[0]),
      end: new Date(dateRange[1]),
    });
  };

  const isActiveWeekdayOf = (date: Date, weekday: number) => {
    return isDateActive() && getDay(date) === weekday;
  };

  return (
    <div
      className={classNames('in-range-indicator', 'absolute w-full h-full top-0 left-0', {
        [activeClassName]: isDateActive(),
        'rounded-l-full':
          dateRange?.[0]?.toString() === date.toString() || isActiveWeekdayOf(date, 0),
        'rounded-r-full':
          dateRange?.length === 1 ||
          dateRange?.[1]?.toString() === date.toString() ||
          isActiveWeekdayOf(date, 6),
        className,
      })}
      {...restProps}
    ></div>
  );
};
