import { RadioGroup } from '@/components';
import classNames from 'classnames';
import { Color } from './ColorGroup';

type Props = {
  color: Color;
};

export const ColorOption = ({ color }: Props) => {
  return (
    <RadioGroup.Option value={color.value}>
      {({ handleChange, isChecked, value }) => (
        <label className={'flex items-center mb-2.5 cursor-pointer'}>
          <div
            className={classNames('w-[34px] h-[34px] p-1 rounded flex items-center border bg-white', {
              'border-gray-300': !isChecked,
            })}
            style={{ borderColor: isChecked ? color.color : '' }}>
            <div className={classNames('w-full h-full rounded ')} style={{ backgroundColor: color.color }}></div>
          </div>
          <input type='radio' checked={isChecked} value={value} onChange={handleChange} className='minimized' />
          <span className={classNames('ml-2.5 text-medium text-gray-dark', { 'font-bold': isChecked })}>
            {color.label}
          </span>
        </label>
      )}
    </RadioGroup.Option>
  );
};
