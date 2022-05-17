import React from 'react';
import classNames from 'classnames';

import { Form } from '@/components/common';
import { RadioGroup } from '@/components/common/fields';

type Props = {
  passTemplateSelection: any;
};

export const TemplateSelector = ({ passTemplateSelection }: Props) => {
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
                <img
                  src='/images/free-shipping-template-1.png'
                  height={128}
                  width={128}
                  alt='template1 image'
                />
                <input
                  value={value}
                  type='radio'
                  checked={isChecked}
                  className='hidden'
                  onChange={handleChange}
                  onClick={passTemplateSelection('template1')}
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
                <img
                  src='/images/free-shipping-template-2.png'
                  height={128}
                  width={128}
                  alt='template2 image'
                />
                <input
                  value={value}
                  type='radio'
                  checked={isChecked}
                  className='hidden'
                  onChange={handleChange}
                  onClick={passTemplateSelection('template2')}
                />
              </label>
            )}
          </RadioGroup.Option>
        </Form.RadioGroup>
      </div>
    </>
  );
};
