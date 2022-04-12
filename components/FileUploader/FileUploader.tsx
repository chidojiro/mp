import { useTranslation } from 'next-i18next';
import Dropzone from 'react-dropzone';

import { Icon } from '../common';

export const FileUploader = () => {
  const { t } = useTranslation('marketingAction');

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({ className: 'dropzone' })}
            className='flex items-center w-full text-center'
          >
            <input {...getInputProps()} />
            <div className='rounded flex items-center justify-center flex-col flex-1 border border-dashed border-gray text-gray-700 mr-2.5 py-6'>
              <Icon name='upload' size={20} />
              <div className='mb-2.5 text-medium'>{t('dragNdrop')}</div>
              <button
                type='button'
                className='px-2.5 border-gray-700 border rounded-full text-small px-3 py-0.5'
              >
                {t('selectFile')}
              </button>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
