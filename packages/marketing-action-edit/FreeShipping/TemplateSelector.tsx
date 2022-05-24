import React from 'react';
import classNames from 'classnames';
import { Form } from '@/packages/common/Form';
import { RadioGroup } from '@/packages/common/RadioGroup';
import { FreeShippingTemplate } from '@/packages/marketing-action-edit/FreeShipping/FreeShippingTemplate';

type Props = {
  passTemplateSelection: any;
  freeShippingCost: any;
};

export const TemplateSelector = ({ passTemplateSelection, freeShippingCost }: Props) => {
  const renderShipCost = (cost: any) => {
    switch (cost) {
      case cost?.target?.value:
        return cost.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      default:
        return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  };
  return (
    <>
      <div className='flex items-center'>
        <Form.RadioGroup name='template_selection'>
          <RadioGroup.Option key='template1' className='hidden' value='template1'>
            {({ isChecked, value, handleChange }: any) => (
              <label
                className={classNames(
                  'h-content w-content p-8 mr-6 flex items-center justify-center bg-white rounded-[4px] border-2 hover:border-secondary cursor-pointer',
                  {
                    'border-secondary': isChecked,
                    'border-gray-100': !isChecked,
                  }
                )}
              >
                <FreeShippingTemplate
                  templateSelection='template1'
                  freeShippingCost={renderShipCost(freeShippingCost)}
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
            {({ isChecked, value, handleChange }: any) => (
              <label
                className={classNames(
                  'h-content w-content p-8 mr-2 flex items-center justify-center bg-white rounded-[4px] border-2 hover:border-secondary cursor-pointer',
                  {
                    'border-secondary': isChecked,
                    'border-gray-100': !isChecked,
                  }
                )}
              >
                <FreeShippingTemplate
                  templateSelection='template2'
                  freeShippingCost={renderShipCost(freeShippingCost)}
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
