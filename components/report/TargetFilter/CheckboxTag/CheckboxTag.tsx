import { Icon } from '@/components/common';
import classNames from 'classnames';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  value: string;
  label: React.ReactNode;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

// eslint-disable-next-line no-empty-pattern
export const CheckboxTag = ({ value, label, checked, onChange }: Props) => {
  return (
    <label
      className={classNames(
        'rounded-full px-4 py-1.5 font-bold cursor-pointer text-medium',
        'flex items-center gap-1',
        'border border-solid',
        {
          'border-gray-500 bg-white text-gray-dark': !checked,
          'bg-primary border-primary text-white': checked,
        }
      )}
    >
      <div
        className={classNames('w-3 h-3 rounded-sm flex items-center justify-center', {
          'bg-input': !checked,
          'bg-white': checked,
        })}
      >
        {checked && <Icon name='check' className='w-[10px] h-[8px] text-primary' />}
      </div>
      <span>{label}</span>
      <input
        type='checkbox'
        value={value}
        onChange={onChange}
        checked={checked}
        className='minimized'
      />
    </label>
  );
};
