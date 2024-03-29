import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { InputProps } from './Input';
import { Select } from './Select';
import { useControllable } from './useControllable';
import { NumberUtils } from './utils';

export type TimeInputProps = Omit<InputProps, 'ref'>;

export const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, defaultValue, name, value: valueProp, onChange }, ref) => {
    const [value, setValue] = useControllable({
      value: valueProp,
      onChange,
      defaultValue: defaultValue ?? '00:00',
    });

    const { t } = useTranslation();

    const handleHourChange = (value: string) => {
      setValue((prev: string) => {
        const [, minute] = prev.split(':');

        return `${value}:${minute}`;
      });
    };

    const handleMinuteChange = (value: string) => {
      setValue((prev: string) => {
        const [hour] = prev.split(':');

        return `${hour}:${value}`;
      });
    };

    const [hour, minute] = value.split(':');

    const hourOptions = new Array(24).fill(null).map((_, idx) => ({
      label: idx + t('h'),
      value: NumberUtils.pad(idx, 2),
    }));

    const minuteOptions = [
      { label: '00' + t('m'), value: '00' },
      { label: '30' + t('m'), value: '30' },
    ];

    return (
      <div className={classNames('flex items-center gap-1', className)}>
        <input className='minimized' ref={ref} />
        <Select
          value={hour}
          onChange={handleHourChange}
          className='w-[80px]'
          options={hourOptions}
        />
        <Select
          value={minute}
          onChange={handleMinuteChange}
          className='w-[80px]'
          options={minuteOptions}
        />
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
