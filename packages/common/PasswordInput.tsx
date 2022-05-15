import { EyeOffIcon } from '@heroicons/react/outline';
import { EyeIcon } from '@heroicons/react/solid';

import { Input, InputProps } from './Input';
import { useVisibilityControl } from './useVisibilityControl';

// eslint-disable-next-line @typescript-eslint/ban-types
export type PasswordInputProps = Omit<InputProps, 'type'>;

// eslint-disable-next-line no-empty-pattern
export const PasswordInput = ({ ...restProps }: PasswordInputProps) => {
  const showPasswordControl = useVisibilityControl();

  return (
    <Input
      className='w-full mb-1'
      type={showPasswordControl.visible ? 'text' : 'password'}
      innerRight={
        <div className='cursor-pointer select-none' onClick={showPasswordControl.toggle}>
          {showPasswordControl.visible ? (
            <EyeIcon className='w-5 h-5' />
          ) : (
            <EyeOffIcon className='w-5 h-5' />
          )}
        </div>
      }
      {...restProps}
    />
  );
};
