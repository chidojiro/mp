import React from 'react';

import classNames from 'classnames';

import { Form, RadioGroup } from '@/components';

type Props = {
  preselectedTemplate?: string;
};

export const TemplateSelector = ({ preselectedTemplate = '' }: Props) => {
  const [selectedTemplate, setSelectedTemplate] = React.useState(preselectedTemplate);

  console.log('TEMPLATE: ', selectedTemplate);
  return (
    <>
      <div className='flex items-center'>
        <div
          className={classNames(
            'h-52 w-52 mr-2 flex items-center justify-center bg-white rounded-[4px] border-2 hover:border-secondary cursor-pointer',
            {
              'border-secondary': selectedTemplate === 'template1',
              'border-gray-100': selectedTemplate !== 'template1',
            }
          )}
          onClick={() => setSelectedTemplate('template1')}
        >
          <img src='http://placehold.jp/128x128.png' alt='placeholder image' />
        </div>
        <div
          className={classNames(
            'h-52 w-52 flex items-center justify-center bg-white rounded-[4px] border-2 hover:border-secondary cursor-pointer',
            {
              'border-secondary': selectedTemplate === 'template2',
              'border-gray-100': selectedTemplate !== 'template2',
            }
          )}
          onClick={() => setSelectedTemplate('template2')}
        >
          <img src='http://placehold.jp/128x128.png' alt='placeholder image' />
        </div>

        <Form.RadioGroup name='template-selection'>
          <RadioGroup.Option
            key='template1'
            className='hidden'
            value='template1'
            checked={selectedTemplate === 'template1' ? true : false}
          />
          <RadioGroup.Option
            key='template2'
            className='hidden'
            value='template2'
            checked={selectedTemplate === 'template2' ? true : false}
          />
        </Form.RadioGroup>
      </div>
    </>
  );
};
