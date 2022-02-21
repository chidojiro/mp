import React, { Fragment, useState } from 'react';
// import classNames from "classnames";

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = SelectProps;

export type SelectProps = {
  defaultValue?: string, 
  /**
   * Array use to create selection options.
   * Example: [{name: "Korone", id: 1}, {name: "Okayu", id: 2}, {name: "Kizuna Ai", id: 3}]
  */
  options: any[],
}

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export const Select = ({ defaultValue, options, ...props }: SelectProps) => {
  const [selected, setSelected] = useState(defaultValue ? defaultValue : 'Options')
  return (
  <Menu as="div" className="relative inline-block text-left" {...props}>
      <div>
        <Menu.Button className="inline-flex justify-between w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100">
          {selected}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 bg text-secondary" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {options.map(option => {
              return (
                <Menu.Item key={option.id}>
                  {({ active }) => (
                    <a
                      href={option.href}
                      onClick={() => setSelected(option.name)}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      {option.name}
                    </a>
                  )}
                </Menu.Item>
              )
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )};

export default Select;

// Example
// <Select label="Vtubers" options={[{name: "Korone", id: 1}, {name: "Okayu", id: 2}, {name: "Kizuna Ai", id: 3}]} defaultValue="Okayu" />