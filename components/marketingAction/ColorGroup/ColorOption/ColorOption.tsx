import classNames from 'classnames';

import { RadioGroup } from '@/components/common/fields';
import { Option } from '@/types';

type Props = {
  color: Option<string>;
};

export const ColorOption = ({ color }: Props) => {
  return (
    <RadioGroup.Option value={color.value}>
      {({ handleChange, isChecked, value, error }) => (
        <label className={'flex items-center mb-2.5 cursor-pointer'}>
          <div
            className={classNames(
              'w-[34px] h-[34px] p-[3px] rounded flex items-center border bg-white',
              isChecked ? 'border-secondary' : 'border-input',
              {
                'border-danger': error,
              }
            )}
          >
            <div
              className={classNames('w-full h-full')}
              style={{ backgroundColor: color.value }}
            ></div>
          </div>
          <input
            type='radio'
            checked={isChecked}
            value={value}
            onChange={handleChange}
            className='minimized'
          />
          <span
            className={classNames('ml-2.5 text-medium text-gray-dark', {
              'font-bold': isChecked,
            })}
          >
            {color.label}
          </span>
        </label>
      )}
    </RadioGroup.Option>
  );
};
