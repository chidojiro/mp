import { useProfile } from '@/auth/useProfile';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { TargetFilter } from '@/marketing-action/TargetFilter';
import { MarketingActionAliasKey } from '@/marketing-action/types';
import { ChatbotDetailsTable } from '@/report/ChatbotDetailsTable';
import { NotificationDetailsTable } from '@/report/NotificationDetailsTable';
import { PopupDetailsTable } from '@/report/PopupDetailsTable';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

export const MonthlyReport = () => {
  const {
    query: { organizationId, projectId, actionType },
  } = useRouter();
  const { t } = useTranslation('report');
  const { data: profile } = useProfile();
  const isNotificationType = (type: string) => {
    return (
      type === MarketingActionAliasKey.CART_LEFT_NOTIFICATION ||
      MarketingActionAliasKey.AFTER_PURCHASE === type
    );
  };
  const isChatbotType = (type: string) => {
    return [
      MarketingActionAliasKey.CART_PAGE_FAQ,
      MarketingActionAliasKey.RECOMMEND_DIAGNOSTIC,
      MarketingActionAliasKey.HISTORY_PURCHASE,
      MarketingActionAliasKey.HISTORY_PURCHASE_CATEGORY,
    ].includes(type as MarketingActionAliasKey);
  };
  const isPopupType = (type: string) => MarketingActionAliasKey.CONDITIONAL_FREE_SHIPPING === type;

  return (
    <PrivateLayout
      title={t('measureReport')}
      subTitle={`${t(actionType as string)}${t('monthly')}`}
    >
      <div className='space-y-5'>
        <div className='flex items-center gap-5'>
          <div className='font-bold'>{t('period')}</div>
          <div className='text-gray-800'>2021年12月13日（月）〜2022年01月11日（火）</div>
        </div>
        <TargetFilter />
      </div>
      <div className='mt-10'>
        {isNotificationType(actionType as string) && (
          <NotificationDetailsTable
            organizationId={organizationId as string}
            projectId={projectId as string}
            actionType={actionType as string}
          />
        )}
        {isChatbotType(actionType as string) && (
          <ChatbotDetailsTable
            organizationId={organizationId as string}
            projectId={projectId as string}
            actionType={actionType as string}
          />
        )}
        {isPopupType(actionType as string) && (
          <PopupDetailsTable
            organizationId={organizationId as string}
            projectId={projectId as string}
            actionType={actionType as string}
          />
        )}
      </div>
    </PrivateLayout>
  );
};

export default MonthlyReport;
export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'report'])),
  },
});
