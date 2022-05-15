import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { isArray, isDate } from 'lodash-es';

import { Icon } from '../Icon';

import { DatePickerProps } from './types';
import { useDatePickerDisplayValue } from './useDatePickerDisplayValue';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  Pick<DatePickerProps, 'error' | 'range'> & {
    selectedDate: Date | Date[];
    onClearClick: React.MouseEventHandler<HTMLDivElement>;
    active?: boolean;
  };

const DATE_SEPARATOR = ' ~ ';

export const CalendarTrigger = React.forwardRef(
  (
    {
      error,
      className,
      selectedDate,
      onClearClick,
      range,
      active,
      placeholder,
      ...restProps
    }: Props,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { t } = useTranslation();

    const temp0DisplayDate = useDatePickerDisplayValue(
      isArray(selectedDate) ? selectedDate[0] : undefined
    );
    const temp1DisplayDate = useDatePickerDisplayValue(
      isArray(selectedDate) ? selectedDate[1] : undefined
    );
    const tempDisplayDate = useDatePickerDisplayValue(
      isDate(selectedDate) ? selectedDate : undefined
    );

    const resolveDisplayValue = () => {
      if (!selectedDate) return '';

      if (range) return [temp0DisplayDate, temp1DisplayDate].filter(Boolean).join(DATE_SEPARATOR);

      return tempDisplayDate;
    };

    const isValueNotEmpty =
      (isArray(selectedDate) && selectedDate.length) || (!isArray(selectedDate) && !!selectedDate);

    return (
      <div
        ref={ref}
        className={classNames(
          'rounded border border-input bg-white cursor-pointer text-medium',
          'h-9 w-full pl-4',
          'flex items-center',
          { 'border-danger': error },
          className
        )}
        {...restProps}
      >
        <Icon name='calendar' size={18} className='mr-3' />
        {isValueNotEmpty ? (
          <div className='flex items-center flex-1 justify-between'>
            <div data-testid='vs-date-picker__value' className='truncate'>
              {resolveDisplayValue()}
            </div>
            <div onClick={onClearClick} className='mx-4 text-secondary underline'>
              {t('clear')}
            </div>
          </div>
        ) : (
          <div className='flex items-center'>
            <div className='truncate text-placeholder text-medium'>
              {placeholder || t(range ? 'dateRangePlaceholder' : 'datePlaceholder')}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CalendarTrigger.displayName = 'CalendarTrigger';
