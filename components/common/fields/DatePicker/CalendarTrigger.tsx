import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { isArray, isDate } from 'lodash-es';

import { Icon } from '@/components/common/Icon';

import { Props as DatePickerProps } from './types';
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

      if (range) return [temp0DisplayDate, temp1DisplayDate].join(DATE_SEPARATOR);

      return tempDisplayDate;
    };

    const isValueNotEmpty =
      (isArray(selectedDate) && selectedDate.length) || (!isArray(selectedDate) && !!selectedDate);

    return (
      <div
        ref={ref}
        className={classNames(
          'rounded border border-input bg-white cursor-pointer',
          'h-9 w-full pl-4',
          'flex justify-between items-center',
          { 'border-danger': error },
          className
        )}
        {...restProps}
      >
        {isValueNotEmpty ? (
          <>
            <div data-testid='vs-date-picker__value' className='truncate'>
              {resolveDisplayValue()}
            </div>
            <div onClick={onClearClick} className='mr-2 hover:text-secondary'>
              {t('clear')}
            </div>
          </>
        ) : (
          <>
            <div className='truncate text-placeholder'>
              {placeholder || t(range ? 'rangePlaceholder' : 'placeholder')}
            </div>
            <Icon
              name='chevron-right'
              size={18}
              className={classNames('flex items-center ml-3 mr-2', {
                'transform rotate-180': active,
              })}
            />
          </>
        )}
      </div>
    );
  }
);

CalendarTrigger.displayName = 'CalendarTrigger';
