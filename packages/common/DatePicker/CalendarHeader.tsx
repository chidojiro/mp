import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

export const CalendarHeader = () => {
  const { t } = useTranslation();

  return (
    <div className='grid grid-cols-7'>
      {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => (
        <div className={classNames('text-center font-semibold text-xs py-1')} key={day}>
          {t(day)}
        </div>
      ))}
    </div>
  );
};
