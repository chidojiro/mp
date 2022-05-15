import React from 'react';
import classNames from 'classnames';

import { Form } from '@/common/Form';
import { RadioGroup } from '@/common/RadioGroup';

export const TemplateSelector = () => {
  return (
    <>
      <div className='flex items-center'>
        <Form.RadioGroup name='template_selection'>
          <RadioGroup.Option key='template1' className='hidden' value='template1'>
            {({ isChecked, value, handleChange }) => (
              <label
                className={classNames(
                  'h-52 w-52 mr-2 flex items-center justify-center bg-white rounded-[4px] border-2 hover:border-secondary cursor-pointer',
                  {
                    'border-secondary': isChecked,
                    'border-gray-100': !isChecked,
                  }
                )}
              >
                <img src='http://placehold.jp/128x128.png' alt='placeholder image' />
                <input
                  value={value}
                  type='radio'
                  checked={isChecked}
                  className='hidden'
                  onChange={handleChange}
                />
              </label>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option key='template2' className='hidden' value='template2'>
            {({ isChecked, value, handleChange }) => (
              <label
                className={classNames(
                  'h-52 w-52 mr-2 flex items-center justify-center bg-white rounded-[4px] border-2 hover:border-secondary cursor-pointer',
                  {
                    'border-secondary': isChecked,
                    'border-gray-100': !isChecked,
                  }
                )}
              >
                <img src='http://placehold.jp/128x128.png' alt='placeholder image' />
                <input
                  value={value}
                  type='radio'
                  checked={isChecked}
                  className='hidden'
                  onChange={handleChange}
                />
              </label>
            )}
          </RadioGroup.Option>
        </Form.RadioGroup>
      </div>
    </>
  );
};
