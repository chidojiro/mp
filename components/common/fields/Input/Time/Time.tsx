import { useControllable } from '@/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { Props as InputProps } from '../Input';

type Props = Omit<InputProps, 'ref'>;

export const TimeInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, defaultValue, name, periods, value: valueProp, onChange, ...restProps }, ref) => {
    const [value, setValue] = useControllable({
      value: valueProp?.toString(),
      onChange,
      defaultValue: defaultValue?.toString(),
    });

    const [hour, setHour] = useState(value?.split(':')[0] || 0);
    const [minute, setMinute] = useState(value?.split(':')[1] || 0);

    const displayHour = useCallback((value: number) => {
      const _value = value > 12 ? value - 12 : value;
      return _value < 10 ? `0${_value}` : _value;
    }, []);

    const displayValue = useCallback((value: number) => {
      return value < 10 ? `0${value}` : value;
    }, []);

    useEffect(() => {
      const _value = `${displayValue(hour)}:${displayValue(minute)}`;
      setValue(_value);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hour, minute, displayValue]);

    const handleInputHour = (event: React.ChangeEvent<HTMLInputElement>) => {
      const _hour = Number(event.target.value.trim());
      if (!(Number.isNaN(_hour) || _hour < 0 || _hour >= 24)) {
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
      setHour((prevState: number) => (prevState >= 12 ? prevState - 12 : prevState + 12));
    };

    const displayPeriod = hour >= 12 ? periods?.[1] || 'PM' : periods?.[0] || 'AM';

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
          {displayPeriod}
        </div>
        <input className={className} value={displayHour(hour)} onInput={handleInputHour} />
        :
        <input className={className} value={displayValue(minute)} onInput={handleInputMinute} />
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
