import { useAuth } from '@/auth/useAuth';
import { Icon, IconName } from '@/common/Icon';
import { Tag } from '@/common/Tag';
import { ClassName } from '@/common/types';
import { AspectRatio } from '@/headless/AspectRatio';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ActionStatus } from './ActionStatus';
import { EditButton } from './EditButton';
import { Label } from './Label';
import { TARGET } from '../types';

type Props = ClassName & {
  iconName: IconName;
  title: string;
  flowImgUrl?: string;
  description: string;
  descriptionImageUrl: string;
  showUseTemplateBtn?: boolean;
  output?: string;
  targets?: any[];
  appearance?: string;
  alias?: string;
};

export const ActionContainer = ({
  iconName,
  title,
  flowImgUrl,
  description,
  descriptionImageUrl,
  showUseTemplateBtn = true,
  targets,
  output,
  appearance,
  alias,
}: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation('common');
  const {
    query: { marketingActionName },
  } = useRouter();

  const auth = useAuth();
  const [editUrl, setEditUrl] = useState('');
  useEffect(() => {
    setEditUrl(
      `/organizations/${auth.organizationId}/projects/${auth.projectId}/actions/edit/${marketingActionName}`
    );
  }, [auth, marketingActionName]);

  const defaultTargets = targets || [
    TARGET.F0_MEMBER,
    TARGET.F1,
    TARGET.F2,
    TARGET.SEMI_LOYAL,
    TARGET.LOYAL,
    TARGET.F1_DORMANT,
    TARGET.LOYAL_DORMANT,
  ];

  return (
    <div className={classNames('p-10', 'rounded-lg border border-solid border-gray-500')}>
      <div className='flex items-center gap-5 mb-4'>
        <Icon size={50} name={iconName} />
        <h3 className='text-gray-800'>{title}</h3>
        <ActionStatus alias={alias} />
      </div>
      <div className='grid grid-cols-10 gap-6'>
        <div className='col-span-7'>
          <div className='leading-6 text-gray-800'>{description}</div>
          <div className='flex flex-wrap mt-8 gap-x-8 gap-y-5'>
            <div className='flex'>
              <Label>{t('degreeOfPriority')}</Label>
              <Tag>
                <div className='mr-1 text-danger'>!!!</div>
                {t('high')}
              </Tag>
            </div>
            <div className='flex'>
              <Label>{t('output')}</Label>
              <Tag>{output || t('chatbot')}</Tag>
            </div>
            {appearance && (
              <div className='flex'>
                <Label>{t('appearancePage')}</Label>
                <Tag>{appearance}</Tag>
              </div>
            )}
            <div className='flex'>
              <Label>{t('estimatedTimeRequired')}</Label>
              <div>10{t('minute')}</div>
            </div>

            <div className='flex'>
              <Label>{t('recommendedCustomer')}</Label>
              <div className='flex flex-wrap gap-1'>
                {defaultTargets.map(target => (
                  <Tag key={target}>{tCommon(target)}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AspectRatio ratio='1-1' className='col-span-3 shrink-0'>
          <img alt='preview-image' src={descriptionImageUrl} />
        </AspectRatio>
      </div>
      {!!flowImgUrl && (
        <div className='mt-5'>
          <Label>{t('policyFlow')}</Label>
          <img className='mt-3' alt='flow-image' src={flowImgUrl} />
        </div>
      )}
      {showUseTemplateBtn && <EditButton alias={alias} typeName={marketingActionName as string} />}
    </div>
  );
};
