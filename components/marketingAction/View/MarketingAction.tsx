import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { MarketingActionAPI } from '@/apis';
import { Button } from '@/components/common';
import { MARKETING_ACTION_URL } from '@/constants';
import { useProfile } from '@/hooks';
import { MarketingActionAlias, MarketingActionRes, MarketingActionStatus } from '@/types';
import { LanguageUtils, TargetFilterUtils } from '@/utils';

import { Action } from './Action';
import { StepDelivery } from './StepDelivery';

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

  const getRange = () => {
    const _startAt = LanguageUtils.getDateFormat(marketingAction?.start_at, locale);
    const _endAt = marketingAction.end_at
      ? LanguageUtils.getDateFormat(marketingAction.end_at, locale)
      : '';
    return `${_startAt} 〜 ${_endAt}`;
  };

  const targetSettings = () => {
    return (
      TargetFilterUtils.getTargetFilters(marketingAction.target_segments)
        .map(target => tCommon(target))
        .join(', ') || ''
    );
  };

  const handleSuspendMA = async () => {
    await MarketingActionAPI.update(marketingAction.id, {
      ...marketingAction,
      marketing_action_type_alias: marketingAction.marketing_action_type?.alias,
      status: MarketingActionStatus.DRAFT,
    });
    mutateMarketingActions?.();
  };

  const handleDeleteMA = async () => {
    await MarketingActionAPI.remove(marketingAction.id);
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
          targetCustomers={marketingAction.target_segments || []}
          date={getRange()}
        />
        <StepDelivery
          settings={marketingAction.settings}
          targetSettings={targetSettings()}
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
                onClick={handleSuspendMA}
                className='text-medium mr-5 min-w-[240px] bg-[#FF7F5C]'
              >
                {t('suspendTemplate')}
              </Button>
            ) : (
              <Button
                onClick={handleDeleteMA}
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
