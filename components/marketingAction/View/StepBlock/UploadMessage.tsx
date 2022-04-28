import { useTranslation } from 'next-i18next';

import { Icon } from '@/components/common';
import { useAsset } from '@/hooks/api';

import { Answer } from './Answer';

type Props = {
  sourceId: string;
};

const UploadMessage = ({ sourceId }: Props) => {
  const { t } = useTranslation('marketingAction');

  const { data: source } = useAsset(sourceId);

  const onDownload = () => {
    // TODO
  };

  return (
    <Answer name={t('csvFileUpload')}>
      {source ? (
        <div onClick={onDownload} className='flex items-center cursor-pointer'>
          <Icon name='document' className='h-[20px] w-[13px]' />
          <div className='mb-1 ml-1 underline text-medium text-gray-dark'>{source.name}</div>
        </div>
      ) : (
        sourceId
      )}
    </Answer>
  );
};

export default UploadMessage;
