import { useControllable, useVisibilityControl } from '@/hooks';
import { NumberUtils } from '@/utils';
import classNames from 'classnames';
import React from 'react';
import { Icon } from '../../Icon';
import { Input, InputProps } from '../Input';
import styles from './TimeInput.module.css';

export type Props = Omit<InputProps, 'ref'>;

export const TimeInput = React.forwardRef<HTMLInputElement, Props>(
  (
    { className, defaultValue, name, value: valueProp, onChange, onFocus, onBlur, ...restProps },
    ref
  ) => {
    const [value, _setValue] = useControllable({
      value: valueProp,
      onChange,
      defaultValue: defaultValue ?? '00:00',
    });

    const isResettingRef = React.useRef(false);

    const focusControl = useVisibilityControl();
    const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      focusControl.open();
      onFocus?.(e);
    };
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      isResettingRef.current = false;
      focusControl.close();
      onBlur?.(e);
    };

    const [hour24, minute] = (value as string).split(':').map(v => +v);
    const isPm = hour24 >= 12;
    const hour12 = (() => {
      if (!isPm && hour24 === 0 && !isResettingRef.current) return 12;

      if (isPm && hour24 === 12 && !isResettingRef.current) return 12;

      return isPm ? hour24 - 12 : hour24;
    })();

    const setValue = ({
      hour24: newHour24 = hour24,
      minute: newMinute = minute,
    }: {
      hour24?: number;
      minute?: number;
    }) => {
      _setValue(`${NumberUtils.pad(newHour24, 2)}:${NumberUtils.pad(newMinute)}`);
    };

    const handleHourKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      if (e.key === 'Backspace') {
        isResettingRef.current = true;
      } else {
        isResettingRef.current = false;
      }
    };

    const handleHourChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const newHour = +e.target.value;
      const hour24Offset = +isPm * 12;

      // e.g 12:01 AM = 00:01
      // or 12:01 PM = 12:01
      const newHour24 = [0, 12].includes(newHour) ? 0 + hour24Offset : newHour + hour24Offset;

      setValue({ hour24: newHour24 });
    };

    const handleMinuteChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const newMinute = +e.target.value;
      setValue({ minute: newMinute });
    };

    const toggleAm = () => {
      if (isPm) {
        setValue({ hour24: hour24 - 12 });
      } else {
        setValue({ hour24: hour24 + 12 });
      }
    };

    return (
      <div
        className={classNames(
          'mp-time-input',
          'px-3 py-2',
          'flex items-center justify-center gap-0.5',
          'border border-solid border-input rounded',
          'bg-white',
          styles['mp-time-input'],
          className
        )}
      >
        <input ref={ref} name={name} className='minimized' {...restProps} />
        <Icon name='clock' className='shrink-0' size={20} />
        <div onClick={toggleAm} className='cursor-pointer select-none'>
          {isPm ? 'PM' : 'AM'}
        </div>
        <div className='flex items-center justify-center'>
          <Input
            type='number'
            value={hour12}
            onChange={handleHourChange}
            min={0}
            max={12}
            pad={2}
            className={classNames('mp-time-input__hour', 'w-5 overflow-hidden border-none')}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleHourKeyDown}
          />
          :
          <Input
            type='number'
            value={minute}
            onChange={handleMinuteChange}
            min={0}
            max={59}
            pad={2}
            className={classNames('mp-time-input__minute', 'w-5 overflow-hidden border-none')}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';
