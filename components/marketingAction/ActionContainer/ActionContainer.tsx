import { Button, Icon, IconName, Tag } from '@/components';
import { ClassName } from '@/types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { Label } from './Label';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  iconName: IconName;
  title: string;
  flowImgUrl?: string;
  description: string;
  descriptionImageUrl: string;
};

// eslint-disable-next-line no-empty-pattern
export const ActionContainer = ({
  iconName,
  title,
  flowImgUrl,
  description,
  descriptionImageUrl,
}: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className={classNames('p-10', 'rounded-lg border border-solid border-gray-500')}>
      <div className='flex items-center gap-5 mb-4'>
        <Icon size={50} name={iconName} />
        <h3 className='text-gray-800'>{title}</h3>
      </div>
      <div className='flex'>
        <div>
          <div className='text-gray-800'>{description}</div>
          <div className='flex flex-wrap gap-8 mt-5'>
            <div className='flex'>
              <Label>{t('degreeOfPriority')}</Label>
              <Tag>
                <div className='mr-1 text-danger'>!!!</div>
                {t('high')}
              </Tag>
            </div>
            <div className='flex'>
              <Label>{t('relatedPages')}</Label>
              <Tag>{t('TOP')}</Tag>
            </div>
            <div className='flex'>
              <Label>{t('output')}</Label>
              <Tag>{t('lineEmail')}</Tag>
            </div>
            <div className='flex'>
              <Label>{t('appearancePage')}</Label>
              <Tag>{t('category')}</Tag>
            </div>
            <div className='flex'>
              <Label>{t('estimatedTimeRequired')}</Label>
              <Tag>00{t('minute')}</Tag>
            </div>
          </div>
          <div className='flex mt-5'>
            <Label>{t('recommendedCustomer')}</Label>
            <div className='flex gap-1'>
              <Tag>{tCommon('f0member')}</Tag>
              <Tag>{tCommon('f0others')}</Tag>
              <Tag>{tCommon('semiRoyal')}</Tag>
              <Tag>{tCommon('royal')}</Tag>
              <Tag>{tCommon('dormant')}</Tag>
              <Tag>{tCommon('f1dormant')}</Tag>
              <Tag>{tCommon('royalDormant')}</Tag>
            </div>
          </div>
        </div>
        <img className='ml-10 w-[240px]' alt='' src={descriptionImageUrl} />
      </div>
      {!!flowImgUrl && (
        <div className='mt-5'>
          <Label>{t('policyFlow')}</Label>
          <img className='mt-3' alt='' src={flowImgUrl} />
        </div>
      )}
      <Button className='w-[360px] !block mx-auto mt-6'>{t('useThisTemplate')}</Button>
    </div>
  );
};