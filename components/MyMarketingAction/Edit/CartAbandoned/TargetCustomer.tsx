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
        <label className={'flex items-center mb-2.5'}>
          <div
            className={classNames(
              'w-5 h-5 rounded flex items-center justify-center ',
              isChecked ? 'bg-secondary' : 'bg-white'
            )}>
            <Icon name='check' className='w-[16px] h-[13px]' size={5} />
          </div>
          <input type='checkbox' value={value} onChange={handleChange} className='minimized' />
          <span className={'ml-2.5 text-regular-sm text-gray-dark'}>{label}</span>
        </label>
      )}
    </CheckboxGroup.Option>
  );
};
