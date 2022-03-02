import classNames from 'classnames';
import { HTMLInputProps } from '@/types';
import React from 'react';

type ColorScheme = 'primary' | 'secondary';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Omit<HTMLInputProps, 'ref'> & { label?: string; colorScheme?: ColorScheme };

const activeBackgrounds: { [key in ColorScheme]: string } = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
};

const activeBorders: { [key in ColorScheme]: string } = {
  primary: 'border-primary',
  secondary: 'border-secondary',
};

// eslint-disable-next-line no-empty-pattern
export const Radio = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      checked: checkedProp,
      onChange,
      className,
      label,
      defaultChecked,
      colorScheme = 'primary',
      ...restProps
    }: Props,
    ref: any
  ) => {
    const [checkedState, setCheckedState] = React.useState(checkedProp ?? defaultChecked);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      setCheckedState(e.target.checked);
      onChange?.(e);
    };

    const checked = checkedProp ?? checkedState;

    const activeBackground = activeBackgrounds[colorScheme];
    const activeBorder = activeBorders[colorScheme];

    return (
      <label
        className={classNames('mp-radio', 'flex items-center', className)}
        role='switch'
        aria-checked={checked}
      >
        <div
          className={classNames(
            'w-4 h-4',
            'flex items-center justify-center',
            'border border-solid rounded-full',
            {
              'border-input-focus bg-white': !checked,
              [activeBackground]: checked,
              [activeBorder]: checked,
            }
          )}
        >
          <div className={classNames('w-1.5 h-1.5 rounded-full', { 'bg-white': checked })}></div>
        </div>
        <input
          className='minimized'
          type='radio'
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          {...restProps}
        />
        {!!label && <span className='block ml-1'>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
