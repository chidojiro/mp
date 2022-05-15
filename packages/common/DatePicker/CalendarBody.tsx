import React from 'react';
import classNames from 'classnames';
import { getDate, isSameMonth, isWithinInterval } from 'date-fns';
import { isArray } from 'lodash-es';

import { InRangeIndicator } from './InRangeIndicator';
import { DatePickerProps } from './types';

type Props = Pick<DatePickerProps, 'min' | 'max' | 'range'> & {
  onDateClick: (date: Date) => void;
  daysOfMonths: Date[];
  month: Date;
  today: Date;
  selectedDate?: Date | Date[];
  onDateMouseEnter: (date: Date) => void;
  onDateMouseLeave: () => void;
  previewDates?: Date[];
};

export const CalendarBody = ({
  onDateClick,
  daysOfMonths,
  min,
  max,
  month,
  range,
  today,
  selectedDate,
  onDateMouseEnter,
  onDateMouseLeave,
  previewDates,
}: Props) => {
  const isDateActive = (date: Date) => {
    if (!isArray(selectedDate)) return date.toString() === selectedDate?.toString();

    if (selectedDate.length === 0) return false;

    if (selectedDate?.length === 1) return date.toString() === selectedDate[0]?.toString();

    return isWithinInterval(date, {
      start: selectedDate[0],
      end: selectedDate[1],
    });
  };

  return (
    <div className='grid grid-cols-7'>
      {daysOfMonths.map(day => (
        <div
          data-testid={day}
          onClick={() => onDateClick(day)}
          onMouseEnter={() => onDateMouseEnter(day)}
          onMouseLeave={() => onDateMouseLeave()}
          className={classNames('mb-0.5 mt-1.5 relative', {
            'opacity-30 pointer-events-none': !isSameMonth(month, day),
            disabled: (max && day > max) || (min && day < min),
          })}
          key={day.toString()}
        >
          {range && previewDates && (
            <InRangeIndicator
              activeClassName='bg-primary opacity-40'
              date={day}
              dateRange={previewDates}
            />
          )}
          <InRangeIndicator activeClassName='bg-primary' date={day} dateRange={[today]} />
          {range && (
            <InRangeIndicator
              activeClassName='bg-primary'
              date={day}
              dateRange={selectedDate as Date[]}
            />
          )}
          <div
            className={classNames(
              'text-center text-xs py-0.5 rounded-full cursor-pointer select-none relative z-50',
              {
                'text-white bg-primary': isDateActive(day),
                'bg-primary': !range && day === today,
              }
            )}
          >
            {getDate(day)}
          </div>
        </div>
      ))}
    </div>
  );
};
