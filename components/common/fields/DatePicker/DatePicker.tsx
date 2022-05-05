import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import {
  addDays,
  addMonths,
  endOfMonth,
  getDate,
  getDay,
  max as fnsMax,
  min as fnsMin,
  set,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { isArray, isDate } from 'lodash-es';

import { Icon } from '@/components/common/Icon';
import { Popover } from '@/components/common/Popover';
import { useControllable, useVisibilityControl } from '@/hooks';

import { CalendarBody } from './CalendarBody';
import { CalendarHeader } from './CalendarHeader';
import { CalendarTrigger } from './CalendarTrigger';
import { MonthNavigator } from './MonthNavigator';
import { Props } from './types';
import { useDatePickerDisplayValue } from './useDatePickerDisplayValue';

const resolveFullRange = (date1: Date, date2: Date) => {
  const fromDate = fnsMin([date1, date2]);
  const toDate = fnsMax([date1, date2]);

  return [fromDate, toDate];
};

export const DatePicker = React.forwardRef<HTMLInputElement, Props>(
  (
    { value: valueProp, onChange, className, min, max, name, error, range, ...restProps }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const { t } = useTranslation();

    const today = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const defaultValue = range ? ([] as Date[]) : undefined;

    const [value, setValue] = useControllable({
      value: valueProp,
      onChange,
      defaultValue,
    });
    const [tempValue, setTempValue] = React.useState<Date | Date[] | undefined>(defaultValue);
    const [hoveredDate, setHoveredDate] = React.useState<Date>();
    const [viewingMonth, setViewingMonth] = React.useState<Date>(today);

    const handleDropdownShow = () => {
      if (range) {
        setViewingMonth(value?.[0] || today);
      } else {
        setViewingMonth(value || today);
      }

      setTempValue(value);
    };

    const control = useVisibilityControl({ onOpen: handleDropdownShow });

    const getCalendarDays = () => {
      const startOfViewingMonth = startOfMonth(new Date(viewingMonth));
      const endOfViewingMonth = endOfMonth(new Date(viewingMonth));

      const startWeekDayOfViewingMonth = getDay(startOfViewingMonth);
      const endWeekDayOfViewingMonth = getDay(endOfViewingMonth);

      const daysOfPreviousMonth = new Array(startWeekDayOfViewingMonth)
        .fill(null)
        .map((_, idx) => subDays(startOfViewingMonth, startWeekDayOfViewingMonth - idx));

      const daysOfViewingMonth = new Array(getDate(endOfViewingMonth))
        .fill(null)
        .map((_, idx) => addDays(startOfViewingMonth, idx));

      const daysOfNextMonth = new Array(6 - endWeekDayOfViewingMonth)
        .fill(null)
        .map((_, idx) => addDays(endOfViewingMonth, idx + 1));

      return [daysOfPreviousMonth, daysOfViewingMonth, daysOfNextMonth].flat();
    };

    const viewNextMonth = () => {
      setViewingMonth(addMonths(new Date(viewingMonth), 1));
    };

    const viewPreviousMonth = () => {
      setViewingMonth(subMonths(new Date(viewingMonth), 1));
    };

    const handleConfirmChange = () => {
      control.close();

      if (isArray(tempValue)) {
        if (tempValue?.length === 1) {
          setValue([tempValue[0], tempValue[0]]);

          return;
        }

        if (tempValue?.length === 2) {
          setValue(tempValue);

          return;
        }
      }

      setValue(tempValue);
    };

    const handleDateClick = (date: Date) => {
      if (range) {
        setTempValue((prevTempValue: any) => {
          if (!prevTempValue.length) return [date];

          const [prevFromDate, prevToDate] = prevTempValue as Date[];

          if (prevToDate) return [date];

          return resolveFullRange(prevFromDate, date);
        });
      } else {
        setTempValue(date);
      }
    };

    const handleClear: React.MouseEventHandler<HTMLDivElement> = e => {
      e.stopPropagation();

      setValue(defaultValue);
      setTempValue(defaultValue);
    };

    const temp0Date = useDatePickerDisplayValue(isArray(tempValue) ? tempValue[0] : undefined);
    const temp1Date = useDatePickerDisplayValue(isArray(tempValue) ? tempValue[1] : undefined);
    const tempDate = useDatePickerDisplayValue(isDate(tempValue) ? tempValue : undefined);

    return (
      <div className={classNames(className)}>
        <input name={name} ref={ref} className='minimized' />
        <Popover
          control={control}
          placement='bottom'
          trigger={
            <CalendarTrigger
              onClick={control.toggle}
              onClearClick={handleClear}
              selectedDate={value}
              range={range}
              error={error}
              {...restProps}
            />
          }
        >
          <div className='bg-white w-80 rounded-lg' style={{ boxShadow: '0px 0px 3px #00000029' }}>
            <div className='flex items-center justify-center h-14'>
              {isArray(tempValue) ? (
                <>
                  <div className='px-2 border-b-2 w-35 h-5 border-secondary text-center text-xs min-w-[115px]'>
                    {temp0Date}
                  </div>
                  <Icon
                    name='chevron-right'
                    className='mx-2 transition-none text-secondary'
                    size={12}
                  />
                  <div className='px-2 border-b-2 w-35 h-5 border-secondary text-center text-xs min-w-[115px]'>
                    {temp1Date}
                  </div>
                </>
              ) : (
                <div className='px-2 border-b-2 w-35 h-5 border-secondary text-center text-xs min-w-[115px]'>
                  {tempDate}
                </div>
              )}
            </div>
            <div className='px-2 pb-5 bg-gray-A100 p-3'>
              <MonthNavigator
                month={viewingMonth}
                min={min}
                max={max}
                onPrevClick={viewPreviousMonth}
                onNextClick={viewNextMonth}
              />
              <CalendarHeader />
              <CalendarBody
                min={min}
                max={max}
                range={range}
                today={today}
                selectedDate={tempValue}
                previewDates={
                  isArray(tempValue) && tempValue?.[0] && !tempValue?.[1] && hoveredDate
                    ? resolveFullRange(tempValue[0], hoveredDate)
                    : undefined
                }
                month={viewingMonth}
                onDateClick={handleDateClick}
                daysOfMonths={getCalendarDays()}
                onDateMouseEnter={date => setHoveredDate(date)}
                onDateMouseLeave={() => setHoveredDate(undefined)}
              />
            </div>
            <div className='flex items-center justify-center h-16'>
              <div
                className='px-5 py-1 text-xs text-white transition-colors rounded-full cursor-pointer bg-primary hover:opacity-80'
                onClick={handleConfirmChange}
              >
                {t('completed')}
              </div>
            </div>
          </div>
        </Popover>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
