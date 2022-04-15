import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@/components/common';
import { MarketingActionAlias, MarketingActionRes, MarketingActionStatus } from '@/types';
import { LanguageUtils, TargetFilterUtils } from '@/utils';
import { MARKETING_ACTION_URL } from '@/constants';
import { MarketingActionAPI } from '@/apis';

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

  const getRange = () => {
    const _startAt = LanguageUtils.getDateFormat(marketingAction?.start_at, locale);
    const _endAt = marketingAction.end_at
      ? LanguageUtils.getDateFormat(marketingAction.end_at, locale)
      : '';
    return `${_startAt} 〜 ${_endAt}`;
  };

  const targetSettings = () => {
    return TargetFilterUtils.getTargetFilters(marketingAction.target_segments).join(', ') || '';
  };

  const handleSuspendMA = () => {
    MarketingActionAPI.update(marketingAction.id, {
      ...marketingAction,
      status: MarketingActionStatus.DRAFT,
    });
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
            {!!showSuspendBtn && (
              <Button onClick={handleSuspendMA} className='mr-5 min-w-[240px] bg-[#FF7F5C]'>
                {t('suspendTemplate')}
              </Button>
            )}
            <Link
              passHref
              href={`/organizations/1/projects/1/actions/edit/${marketingActionUrl.path}/${marketingAction.id}`}
            >
              <Button colorScheme='negative' className='mr-5 min-w-[240px]'>
                {t('editInEditor')}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
