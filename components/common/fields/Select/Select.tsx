import { Option } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React, { Fragment, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = SelectProps;

export type SelectProps = {
  defaultValue?: string;
  options: Option[];
  onChange?: (value: string) => void;
};

const getStylesByActiveStatus = (active: boolean) =>
  classNames({
    'bg-gray-100 text-gray-900': active === true,
    'text-gray-700': active === false,
    'block px-4 py-2 text-sm': true,
  });

export const Select = ({ defaultValue, onChange, options, ...props }: SelectProps) => {
  const [selected, setSelected] = useState(defaultValue ? defaultValue : options[0].value);

  const handleSelect = (option: any) => {
    setSelected(option.value);
    onChange?.(option.value);
  };

  const selectedOption = options.find(({ value }) => selected === value);

  return (
    <Menu as='div' className='relative inline-block text-left' {...props}>
      <div>
        <Menu.Button className='inline-flex items-center justify-between w-[200px] px-2.5 py-1.5 text-sm text-gray-dark bg-white border border-gray-300 rounded shadow-sm text-medium hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100'>
          {selectedOption?.label}
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
        <Menu.Items className='absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {options.map((option, id) => {
              return (
                <Menu.Item key={id}>
                  {({ active }) => (
                    <div
                      onClick={() => handleSelect(option)}
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
};

export default Select;

// Example
// <Select label="Vtubers" options={[{name: "Korone", id: 1}, {name: "Okayu", id: 2}, {name: "Kizuna Ai", id: 3}]} defaultValue="Okayu" />
