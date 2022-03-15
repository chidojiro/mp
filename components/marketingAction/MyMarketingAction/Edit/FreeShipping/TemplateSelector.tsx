import classNames from 'classnames';
import React from 'react';

type Props = {
  preselectedTemplate?: string;
};

export const TemplateSelector = ({ preselectedTemplate }: Props) => {
  const [selectedTemplate, setSelectedTemplate] = React.useState(
    preselectedTemplate ? preselectedTemplate : ''
  );

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
      </div>
    </>
  );
};
