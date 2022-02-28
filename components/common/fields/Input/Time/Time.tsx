import { useControllable } from '@/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { Props as InputProps } from '../Input';

type Props = Omit<InputProps, 'ref'>;

export const TimeInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, defaultValue, name, prefixes, value: valueProp, onChange, ...restProps }, ref) => {
    const [value, setValue] = useControllable({
      value: valueProp?.toString(),
      onChange,
      defaultValue: defaultValue?.toString(),
    });

    const [hour, setHour] = useState(value?.split(':')[0] || 0);
    const [minute, setMinute] = useState(value?.split(':')[1]?.split(' ')[0] | 0);

    const periods = [
      {
        name: prefixes?.[0] || 'AM',
        value: 'AM',
      },
      {
        name: prefixes?.[1] || 'PM',
        value: 'PM',
      },
    ];
    const [period, setPeriod] = useState(periods[0]);

    const displayValue = useCallback((value: number) => {
      return value < 10 ? `0${value}` : value;
    }, []);

    useEffect(() => {
      const _value = `${displayValue(hour)}:${displayValue(minute)} ${period.value}`;
      setValue(_value);
    }, [hour, minute, setValue, displayValue]);

    const handleInputHour = (event: React.ChangeEvent<HTMLInputElement>) => {
      const _hour = Number(event.target.value.trim());
      if (!(Number.isNaN(_hour) || _hour < 0 || _hour > 12)) {
        setHour(_hour);
      }
    };

    const handleInputMinute = (event: React.ChangeEvent<HTMLInputElement>) => {
      const _minute = Number(event.target.value.trim());
      if (!(Number.isNaN(_minute) || _minute < 0 || _minute > 59)) {
        setMinute(_minute);
      }
    };

    const onChangePeriod = () => {
      setPeriod(prevState => (prevState.value === 'AM' ? periods[1] : periods[0]));
    };

    return (
      <div className='flex items-center'>
        <input
          ref={ref}
          name={name}
          value={value}
          onChange={setValue}
          {...restProps}
          className='minimized'
        />
        <div onClick={onChangePeriod} className='mr-1 cursor-pointer'>
          {period.name}
        </div>
        <input className={className} value={displayValue(hour)} onInput={handleInputHour} />
        :
        <input className={className} value={displayValue(minute)} onInput={handleInputMinute} />
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
