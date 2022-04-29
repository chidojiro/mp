import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import { RadioGroup } from '@/components/common';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  value: string;
  label: React.ReactNode;
};

// eslint-disable-next-line no-empty-pattern
export const RadioTag = ({ value, label }: Props) => {
  const { pathname, query } = useRouter();

  return (
    <RadioGroup.Option value={value}>
      {({ handleChange, isChecked, value }) => (
        <Link href={{ pathname, query: { ...query, actionType: value } }} passHref>
          <label
            className={classNames(
              'rounded-full px-4 py-1 font-bold cursor-pointer text-medium',
              'flex items-center gap-1',
              'border border-solid',
              {
                'border-gray-300 bg-white': !isChecked,
                'bg-primary border-primary text-white': isChecked,
              }
            )}
          >
            <div
              className={classNames('w-3 h-3 rounded-full', 'flex items-center justify-center', {
                'bg-input': !isChecked,
                'bg-white': isChecked,
              })}
            >
              {!!isChecked && <div className='w-1.5 h-1.5 rounded-full bg-primary'></div>}
            </div>
            <span>{label}</span>
            <input type='checkbox' value={value} onChange={handleChange} className='minimized' />
          </label>
        </Link>
      )}
    </RadioGroup.Option>
  );
};
