import classNames from 'classnames';

import { Icon } from '@/components/common';
import { CheckboxGroup } from '@/components/common/fields';
import { Option } from '@/types';

type Props = {
  option: Option<string>;
};

export const TargetCustomer = ({ option }: Props) => {
  const { label, value } = option;
  return (
    <CheckboxGroup.Option value={value}>
      {({ handleChange, isChecked, value }) => (
        <label className={'flex items-center mb-2.5 cursor-pointer'}>
          <div
            className={classNames(
              'w-4 h-4 rounded flex items-center justify-center',
              isChecked ? 'bg-secondary' : 'bg-white border border-input'
            )}
          >
            <Icon name='check' className='w-[12px] h-[10px] text-white' />
          </div>
          <input
            checked={isChecked}
            type='checkbox'
            value={value}
            onChange={handleChange}
            className='minimized'
          />
          <span className={'ml-2.5 text-regular-sm text-gray-dark'}>{label}</span>
        </label>
      )}
    </CheckboxGroup.Option>
  );
};
