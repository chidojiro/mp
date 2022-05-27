import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button } from '@/common/Button';
import { LanguageUtils } from '@/common/utils';
import { MarketingActionUtils } from '@/marketing-action/utils';

import { Action } from './Action';
import { StepDelivery } from './StepDelivery';
import { useProfile } from '@/auth/useProfile';
import { MarketingActionStatus, TARGET } from '@/marketing-action/types';
import { MarketingActionAlias } from '@/marketing-action/types';
import { MarketingActionRes } from '@/marketing-action/types';
import { MarketingActionApis } from '@/marketing-action/apis';
import { MARKETING_ACTION_URL } from '@/marketing-action/constants';
import { useForm } from 'react-hook-form';
import { Option } from '@/common/types';

type Props = {
  marketingAction: MarketingActionRes;
  mutateMarketingActions?: () => void;
};

export const MarketingAction = ({ marketingAction, mutateMarketingActions }: Props) => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation('common');

  const {
    locale,
    query: { marketingActionStatus },
  } = useRouter();

  const profile = useProfile();

  const targetOptions = React.useMemo<Option[]>(
    () => [
      { label: tCommon('f0member'), value: TARGET.F0_MEMBER },
      { label: tCommon('f0others'), value: TARGET.F0_OTHERS },
      { label: tCommon('F1'), value: TARGET.F1 },
      { label: tCommon('F2'), value: TARGET.F2 },
      { label: tCommon('semiLoyal'), value: TARGET.SEMI_LOYAL },
      { label: tCommon('loyal'), value: TARGET.LOYAL },
      { label: tCommon('f1dormant'), value: TARGET.F1_DORMANT },
      { label: tCommon('loyalDormant'), value: TARGET.LOYAL_DORMANT },
      { label: tCommon('otherDormant'), value: TARGET.OTHER_DORMANT },
    ],
    [tCommon]
  );

  const suspendTemplateMethods = useForm();
  const deleteTemplateMethods = useForm();

  const getRange = () => {
    const _startAt = LanguageUtils.getDateFormat(marketingAction?.start_at, locale);
    const _endAt = marketingAction.end_at
      ? LanguageUtils.getDateFormat(marketingAction.end_at, locale)
      : '';
    return `${_startAt} 〜 ${_endAt}`;
  };

  const getTargetLabel = (value: string) => {
    return targetOptions.filter(option => option.value === value)[0].label as string;
  };

  const targetSettings = () => {
    return (
      MarketingActionUtils.getTargetFilters(marketingAction.target_segments).map(target =>
        getTargetLabel(target)
      ) || []
    );
  };

  const handleSuspendMA = async () => {
    await MarketingActionApis.update(marketingAction.id, {
      ...marketingAction,
      marketing_action_type_alias: marketingAction.marketing_action_type?.alias,
      status: MarketingActionStatus.DRAFT,
    });
    mutateMarketingActions?.();
  };

  const handleDeleteMA = async () => {
    await MarketingActionApis.remove(marketingAction.id);
    mutateMarketingActions?.();
  };

  const aliasMAType =
    marketingAction?.marketing_action_type?.alias || MarketingActionAlias.CART_LEFT_NOTIFICATION;
  const marketingActionUrl = MARKETING_ACTION_URL[aliasMAType];

  const showSuspendBtn = marketingActionStatus === MarketingActionStatus.RUNNING;
  const btnFooter = showSuspendBtn || marketingActionStatus === MarketingActionStatus.DRAFT;

  return (
    <div>
      <div className='h-full border rounded-lg border-gray'>
        <Action
          icon={marketingActionUrl.icon}
          path={marketingActionUrl.path}
          name={marketingAction?.description || ''}
          targetCustomers={targetSettings() || []}
          date={getRange()}
        />
        <StepDelivery
          settings={marketingAction.settings}
          targetSettings={targetSettings().join(', ')}
          alias={
            marketingAction.marketing_action_type?.alias ||
            MarketingActionAlias.CART_LEFT_NOTIFICATION
          }
        />
      </div>
      <div className='flex justify-center pt-10'>
        {!!btnFooter && (
          <>
            {showSuspendBtn ? (
              <Button
                onClick={suspendTemplateMethods.handleSubmit(handleSuspendMA)}
                loading={suspendTemplateMethods.formState.isSubmitting}
                complete={suspendTemplateMethods.formState.isSubmitSuccessful}
                className='text-medium mr-5 min-w-[240px] bg-[#FF7F5C]'
              >
                {t('suspendTemplate')}
              </Button>
            ) : (
              <Button
                onClick={deleteTemplateMethods.handleSubmit(handleDeleteMA)}
                loading={deleteTemplateMethods.formState.isSubmitting}
                complete={deleteTemplateMethods.formState.isSubmitSuccessful}
                className='text-medium mr-5 min-w-[240px]'
                colorScheme='negative'
              >
                {t('delete')}
              </Button>
            )}

            <Link
              passHref
              href={`/organizations/${profile.data?.organization_id}/projects/${profile.data?.project_id}/actions/edit/${marketingActionUrl.path}/${marketingAction.id}`}
            >
              <Button className='text-medium mr-5 min-w-[240px]'>{t('editInEditor')}</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
