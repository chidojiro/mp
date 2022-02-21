import { CheckboxGroup } from '@/components';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  value: string;
  label: React.ReactNode;
};

// eslint-disable-next-line no-empty-pattern
export const CheckboxTag = ({ value, label }: Props) => {
  return (
    <CheckboxGroup.Option value={value}>
      {({ handleChange, isChecked, value }) => (
        <label
          className={classNames(
            'rounded-full px-4 py-1.5 font-bold cursor-pointer text-medium',
            'flex items-center gap-1',
            'border border-solid',
            {
              'border-gray-500 bg-white': !isChecked,
              'bg-primary border-primary text-white': isChecked,
            }
          )}>
          <div
            className={classNames('w-3 h-3 rounded-sm', {
              'bg-gray-300': !isChecked,
              'bg-white': isChecked,
            })}></div>
          <span>{label}</span>
          <input
            type='checkbox'
            value={value}
            onChange={handleChange}
            checked={isChecked}
            className='minimized'
          />
        </label>
      )}
    </CheckboxGroup.Option>
  );
};
