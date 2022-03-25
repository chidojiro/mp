import { useVisibilityControl } from '@/hooks';
import { Option } from '@/types';
import classNames from 'classnames';
import React from 'react';
import { Popover, PopoverProps } from '../Popover';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = PopoverProps & {
  options?: Option[];
  onSelect?: (value: Option['value']) => void;
};

// eslint-disable-next-line no-empty-pattern
export const Dropdown = ({ options = [], onSelect, control: controlProp, ...restProps }: Props) => {
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  const ownControl = useVisibilityControl();
  const control = controlProp ?? ownControl;

  const keydownHandlers: Record<string, any> = React.useMemo(
    () => ({
      ArrowDown: () => setFocusedIndex(prev => Math.min(prev + 1, options.length - 1)),
      ArrowUp: () => setFocusedIndex(prev => Math.max(prev - 1, 0)),
      Enter: () => onSelect?.(options[focusedIndex].value),
      Escape: () => control.close(),
    }),
    [control, focusedIndex, onSelect, options]
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
      <div className={classNames('mp-dropdown', 'p-2.5', 'bg-white', 'rounded', 'shadow-md')}>
        {options.map(({ label, value }, idx) => (
          <div
            onClick={() => onSelect?.(value)}
            onMouseEnter={() => setFocusedIndex(idx)}
            className={classNames(
              'mp-dropdown-option',
              'block w-full text-left',
              'outline-none',
              'p-2.5 rounded focus:bg-gray-200 cursor-pointer select-none',
              { 'bg-gray-200': focusedIndex === idx }
            )}
            key={value}
          >
            {label}
          </div>
        ))}
      </div>
    </Popover>
  );
};