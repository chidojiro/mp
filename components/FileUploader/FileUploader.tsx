import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

import { AssetAPI } from '@/apis/assets';
import { AssetResourceType } from '@/types';

import { Icon } from '../common';

type Props = {
  name?: string;
  isError?: boolean;
  onChange?: (id: string) => void;
};

export const FileUploader = ({ name, isError, onChange }: Props) => {
  const { t } = useTranslation('marketingAction');
  const [uploading, setUploading] = useState(false);

  const [nameFile, setNameFile] = useState<string>(t('notSelected'));
  const [currId, setCurrId] = useState('');

  useEffect(() => {
    name && setNameFile(name);
  }, [name]);

  const handleDrop = async (acceptedFiles: File[]) => {
    setUploading(true);
    const file = acceptedFiles[0];
    const res = await AssetAPI.create(file, AssetResourceType.marketingAction);
    if (res.id) {
      setNameFile(file.name);
      onChange?.(res.id);
      currId && (await AssetAPI.remove(currId));
      setCurrId(res.id);
    }
    setUploading(false);
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        multiple={false}
        accept={['image/*', 'text/csv']}
        disabled={uploading}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({ className: 'dropzone' })}
            className='flex items-center w-full h-40 text-center'
          >
            <input {...getInputProps()} />
            <div
              className={classNames(
                'rounded flex h-full items-center justify-center flex-col flex-1 border border-dashed text-gray-700 mr-2.5 py-6',
                isError ? 'border-danger' : 'border-gray'
              )}
            >
              <Icon name='upload' size={20} />
              <div className='mb-2.5 text-medium'>{t('dragNdrop')}</div>
              <button
                type='button'
                className='px-2.5 border-gray-700 border rounded-full text-small px-3 py-0.5'
              >
                {t('selectFile')}
              </button>
              <div className='mt-2 text-gray-500 text-small'>{nameFile}</div>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};
