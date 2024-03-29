import React from 'react';
import classNames from 'classnames';

import { Option } from './types';
import { Popover, PopoverProps } from './Popover';
import { useVisibilityControl } from './useVisibilityControl';

// eslint-disable-next-line @typescript-eslint/ban-types
export type DropdownProps = PopoverProps & {
  options?: Option[];
  onSelect?: (value: Option['value'], option: Option) => void;
};

// eslint-disable-next-line no-empty-pattern
export const Dropdown = React.forwardRef(
  ({ options = [], onSelect, control: controlProp, ...restProps }: DropdownProps, ref: any) => {
    const [focusedIndex, setFocusedIndex] = React.useState(0);

    const ownControl = useVisibilityControl();
    const control = controlProp ?? ownControl;

    const handleSelect = React.useCallback(
      (selectedValue: string, option: Option) => {
        onSelect?.(selectedValue, option);
        control.close();
      },
      [control, onSelect]
    );

    const keydownHandlers: Record<string, any> = React.useMemo(
      () => ({
        ArrowDown: () => setFocusedIndex(prev => Math.min(prev + 1, options.length - 1)),
        ArrowUp: () => setFocusedIndex(prev => Math.max(prev - 1, 0)),
        Enter: () => handleSelect(options[focusedIndex].value, options[focusedIndex]),
        Escape: () => control.close(),
      }),
      [control, focusedIndex, handleSelect, options]
    );

    const handleArrowNavigation = React.useCallback(
      e => {
        if (Object.keys(keydownHandlers).includes(e.key)) {
          e.preventDefault();
          e.stopPropagation();

          keydownHandlers[e.key]();
        }
      },
      [keydownHandlers]
    );

    React.useEffect(() => {
      if (control.visible) {
        window.addEventListener('keydown', handleArrowNavigation);
      }

      return () => window.removeEventListener('keydown', handleArrowNavigation);
    }, [control.visible, handleArrowNavigation]);

    React.useEffect(() => {
      if (control?.visible) {
        setFocusedIndex(0);
      }
    }, [control?.visible]);

    return (
      <Popover control={control} {...restProps}>
        {!!options.length && (
          <div
            ref={ref}
            className={classNames(
              'mp-dropdown',
              'rounded',
              'bg-white shadow-[0px_0px_6px_#00000029]',
              'max-h-[50vh] overflow-auto'
            )}
          >
            {options.map((option, idx) => (
              <div
                onClick={() => handleSelect(option.value, option)}
                onMouseEnter={() => setFocusedIndex(idx)}
                className={classNames(
                  'mp-dropdown-option',
                  'block w-full text-left',
                  'outline-none',
                  'px-2.5 py-1.5 focus:bg-gray-200 cursor-pointer select-none',
                  { 'bg-gray-200': focusedIndex === idx }
                )}
                key={idx}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </Popover>
    );
  }
);

Dropdown.displayName = 'Dropdown';
