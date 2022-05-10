import React, { Fragment } from 'react';
import classNames from 'classnames';

import { useControllable } from '@/hooks';
import { Option } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = SelectProps;

export type SelectProps = {
  defaultValue?: string;
  options: Option[];
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  label?: React.ReactNode;
};

const getStylesByActiveStatus = (active: boolean) => {
  return classNames({
    'bg-gray-100 text-gray-900': active === true,
    'text-gray-700': active === false,
    'block px-4 py-2 text-sm': true,
  });
};

export const Select = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      defaultValue,
      value: valueProp,
      onChange: onChangeProp,
      name,
      options,
      className,
      label,
      ...props
    }: SelectProps,
    ref
  ) => {
    const [value, setValue] = useControllable({
      value: valueProp,
      defaultValue,
      onChange: onChangeProp,
    });

    const selectedOption = options.find(({ value: _value }) => _value === value);

    return (
      <Menu as='div' className='relative inline-block text-left'>
        <input name={name} className='minimized' ref={ref} />
        {!!label && <span className='block mb-1'>{label}</span>}
        <div>
          <Menu.Button
            {...props}
            className={classNames(
              'inline-flex items-center justify-between w-[200px] px-2.5 py-1.5 text-sm text-gray-dark bg-white border border-input rounded shadow-sm text-medium hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100',
              className
            )}
          >
            <div>{selectedOption?.label}</div>
            <ChevronDownIcon className='w-5 h-5 ml-2 -mr-1 bg text-secondary' aria-hidden='true' />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 w-full mt-2 origin-top-right bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>
              {options.map((option, id) => {
                return (
                  <Menu.Item key={id}>
                    {({ active }) => (
                      <div
                        onClick={() => setValue(option.value)}
                        className={getStylesByActiveStatus(active)}
                      >
                        {option.label}
                      </div>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);

Select.displayName = 'Select';
