import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from '../common';

type Props = {
  originalUrl?: string;
  className?: string;
};

export interface ImageType extends File {
  preview: string;
}

export const ImageUploader = ({ originalUrl, className }: Props) => {
  const { t } = useTranslation();
  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState<ImageType>();

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploading(true);
    setImage({ ...file, preview: URL.createObjectURL(file) });
    setUploading(false);
  };

  const renderImage = () => {
    return image ? renderUploadingImage() : renderOriginalUrl();
  };

  const renderOriginalUrl = () => (
    <div className='w-[120px] h-[120px] rounded flex justify-center items-center bg-dark-gray'>
      {originalUrl ? (
        <img
          src={originalUrl}
          alt='Logo'
          className={classNames('object-cover rounded w-full h-full', className)}
        />
      ) : (
        <Icon name='no-image' className='w-[60px] h-[30px]' />
      )}
    </div>
  );
  const renderUploadingImage = () => (
    <div className={classNames('w-[120px] h-[120px]', uploading ? 'opacity-50' : 'opacity-100')}>
      <img
        src={image?.preview}
        alt='Logo'
        className={classNames('object-cover rounded w-full h-full', className)}
      />
    </div>
  );

  return (
    <div className='w-full'>
      <Dropzone
        onDrop={handleDrop}
        accept='image/*'
        multiple={false}
        minSize={1024}
        maxSize={3072000}
      >
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
            {renderImage()}
          </div>
        )}
      </Dropzone>
    </div>
  );
};
