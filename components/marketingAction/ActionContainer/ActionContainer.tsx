import { Button, Icon, IconName, Tag } from '@/components';
import { AspectRatio } from '@/headless';
import { ClassName } from '@/types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Label } from './Label';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {
  iconName: IconName;
  title: string;
  flowImgUrl?: string;
  description: string;
  descriptionImageUrl: string;
  showUseTemplateBtn?: boolean;
};

// eslint-disable-next-line no-empty-pattern
export const ActionContainer = ({
  iconName,
  title,
  flowImgUrl,
  description,
  descriptionImageUrl,
  showUseTemplateBtn = true,
}: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation('common');
  const {
    query: { marketingActionName },
  } = useRouter();

  const editUrl = `/organizations/1/projects/1/actions/edit/${marketingActionName}`;

  return (
    <div className={classNames('p-10', 'rounded-lg border border-solid border-gray-500')}>
      <div className='flex items-center gap-5 mb-4'>
        <Icon size={50} name={iconName} />
        <h3 className='text-gray-800'>{title}</h3>
      </div>
      <div className='grid grid-cols-10 gap-6'>
        <div className='col-span-7'>
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
              <Tag>10{t('minute')}</Tag>
            </div>
          </div>
          <div className='flex mt-5'>
            <Label>{t('recommendedCustomer')}</Label>
            <div className='flex flex-wrap gap-1'>
              <Tag>{tCommon('f0member')}</Tag>
              <Tag>{tCommon('f0others')}</Tag>
              <Tag>{tCommon('semiLoyal')}</Tag>
              <Tag>{tCommon('loyal')}</Tag>
              <Tag>{tCommon('dormant')}</Tag>
              <Tag>{tCommon('f1dormant')}</Tag>
              <Tag>{tCommon('loyalDormant')}</Tag>
            </div>
          </div>
          {!!flowImgUrl && (
            <div className='mt-5'>
              <Label>{t('policyFlow')}</Label>
              <img className='mt-3' alt='' src={flowImgUrl} />
            </div>
          )}
        </div>
        <AspectRatio ratio='1-1' className='col-span-3 shrink-0'>
          <img alt='' src={descriptionImageUrl} />
        </AspectRatio>
      </div>
      {showUseTemplateBtn && (
        <Link passHref href={editUrl}>
          <Button className='w-[360px] !block mx-auto mt-6'>{t('useThisTemplate')}</Button>
        </Link>
      )}
    </div>
  );
};
