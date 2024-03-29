import classNames from 'classnames';
import { Dropdown } from '../Dropdown';
import { Icon } from '../Icon';
import { ClassName, Option } from '../types';
import { useVisibilityControl } from '../useVisibilityControl';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  options: Option<string, string>[];
  onSelect?: (option: Option<string, string>) => void;
};

// eslint-disable-next-line no-empty-pattern
export const VariableSign = ({ className, options, onSelect }: Props) => {
  const popoverControl = useVisibilityControl();

  const handleSelect = (_: string, option: Option) => {
    onSelect?.(option as Option<string, string>);
  };

  return (
    <Dropdown
      control={popoverControl}
      options={options}
      onSelect={handleSelect}
      placement='bottom-end'
      trigger={
        <div
          className={classNames(
            className,
            'select-none cursor-pointer',
            'rounded border border-solid border-gray-300 w-7 h-7 flex items-center justify-center text-secondary bg-white'
          )}
        >
          <Icon name='variable' className='w-4 h-4' />
        </div>
      }
    />
  );
};
