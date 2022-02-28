import { CheckboxGroup } from '@/components';
import { Icon } from '@/components';
import classNames from 'classnames';

type Props = {
  label: string;
  value: string;
};

export const TargetCustomer = ({ label, value }: Props) => {
  return (
    <CheckboxGroup.Option value={value}>
      {({ handleChange, isChecked, value }) => (
        <label className={'flex items-center mb-2.5 cursor-pointer'}>
          <div
            className={classNames(
              'w-4 h-4 rounded flex items-center justify-center',
              isChecked ? 'bg-secondary' : 'bg-white border border-gray-300'
            )}>
            <Icon name='check' className='w-[12px] h-[10px]' />
          </div>
          <input checked={isChecked} type='checkbox' value={value} onChange={handleChange} className='minimized' />
          <span className={'ml-2.5 text-regular-sm text-gray-dark'}>{label}</span>
        </label>
      )}
    </CheckboxGroup.Option>
  );
};
