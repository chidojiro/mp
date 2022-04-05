import { useVisibilityControl } from '@/hooks';
import { MarketingActionAlias as MAAlias } from '@/types';
import { useTranslation } from 'next-i18next';
import { PreviewOverlay } from '../../Edit/PreviewOverlay';
import { CartAbandoned } from './CartAbandoned';
import { CartPageFAQ } from './CartPageFAQ';
import { ConditionalFreeShipping } from './ConditionalFreeShipping';
import { RankingByHistoryPurchase } from './RankingByHistoryPurchase';
import { RecommendDiagnosticBot } from './RecommendDiagnosticBot';
import { StepDeliveryAfterPurchase } from './StepDeliveryAfterPurchase';

type Props = {
  targetSettings: string;
  settings: any;
};

const MARKETING_ACTION_STEP_MESSAGE: { [key: string]: any } = {
  [MAAlias.CART_LEFT_NOTIFICATION]: CartAbandoned,
  [MAAlias.AFTER_PURCHASE]: StepDeliveryAfterPurchase,
  [MAAlias.HISTORY_PURCHASE]: RankingByHistoryPurchase,
  [MAAlias.HISTORY_PURCHASE_CATEGORY]: RankingByHistoryPurchase,
  [MAAlias.CART_PAGE_FAQ]: CartPageFAQ,
  [MAAlias.RECOMMEND_DIAGNOSTIC]: RecommendDiagnosticBot,
  [MAAlias.CONDITIONAL_FREE_SHIPPING]: ConditionalFreeShipping,
};

export const StepDelivery = ({ settings, targetSettings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const previewMessageControl = useVisibilityControl();

  const renderStepMessage = () => {
    const Component = settings.alias
      ? MARKETING_ACTION_STEP_MESSAGE[settings.alias]
      : CartAbandoned;
    return <Component settings={settings} />;
  };

  return (
    <div className='rounded-bl-lg rounded-br-lg bg-gray-light'>
      {renderStepMessage()}
      <div className='p-10 pb-6'>
        <h5 className='text-gray-dark'>{t('targetSetting')}</h5>
        <div className='my-2 font-bold text-medium text-secondary'>{t('targetCustomer')}</div>
        <div className='mb-4 text-medium text-gray-dark'>{targetSettings}</div>
      </div>
      <PreviewOverlay
        defaultType='mail'
        mailHeadline='お買い忘れはございませんか？<br>'
        mailBody='いつも<span class="caret-holder"></span><span class="mention-item" contenteditable="false" data-value="brandName">ブランド名</span>をご利用いただきありがとうございます。以下の商品がショッピングカートに保存されたままになっています。 売り切れになってしまう前に、是非購入をご検討くださいませ。<br>'
        lineBody='いつも<span class="caret-holder"></span><span class="mention-item" contenteditable="false" data-value="brandName">ブランド名</span>をご利用いただきありがとうございます。以下の商品がショッピングカートに保存されたままになっています。 売り切れになってしまう前に、是非購入をご検討くださいませ。<br>'
        control={previewMessageControl}
      />
    </div>
  );
};
