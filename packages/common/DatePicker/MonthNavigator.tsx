import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { endOfMonth, format, startOfMonth } from 'date-fns';

import { Icon } from '../Icon';

import { DatePickerProps } from './types';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  Pick<DatePickerProps, 'max' | 'min'> & {
    onPrevClick: () => void;
    onNextClick: () => void;
    month: Date;
  };

export const MonthNavigator = ({
  max,
  min,
  onPrevClick,
  onNextClick,
  className,
  month,
  ...restProps
}: Props) => {
  const { i18n } = useTranslation();

  const monthFormat = i18n.language === 'ja' ? 'yyyy年M月' : 'yyyy/MM';
  const displayMonth = format(month, monthFormat);

  return (
    <div className={classNames('flex items-center justify-between mb-4', className)} {...restProps}>
      <Icon
        size={20}
        name='chevron-right-circle'
        data-testid='vs-date-picker__prev-month'
        className={classNames('cursor-pointer transform rotate-180 transition-colors', {
          disabled: min && startOfMonth(new Date(month)) <= new Date(min),
        })}
        onClick={onPrevClick}
      />
      <div>{displayMonth}</div>
      <Icon
        size={20}
        name='chevron-right-circle'
        onClick={onNextClick}
        data-testid='vs-date-picker__next-month'
        className={classNames('cursor-pointer text-dark-gray-1 transition-colors', {
          disabled: max && endOfMonth(new Date(month)) >= new Date(max),
        })}
      />
    </div>
  );
};
