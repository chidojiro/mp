import { PrivateLayout } from '@/layout/PrivateLayout';
import { TargetFilter } from '@/marketing-action/TargetFilter';
import { ChatbotDetailsTable } from '@/report/ChatbotDetailsTable';
import { NotificationDetailsTable } from '@/report/NotificationDetailsTable';
import { PopupDetailsTable } from '@/report/PopupDetailsTable';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useProfile } from '@/auth/useProfile';
import { MarketingActionAliasKey } from '@/marketing-action/types';

export const ByUrlReport = () => {
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
      MarketingActionAliasKey.CART_PAGE_FAQ,
    ].includes(type as MarketingActionAliasKey);
  };
  const isPopupType = (type: string) => MarketingActionAliasKey.CONDITIONAL_FREE_SHIPPING === type;

  return (
    <PrivateLayout title={t('measureReport')} subTitle={t(actionType as string)}>
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
      <div className='mt-auto text-gray-600'>
        <Link
          passHref
          href={`/organizations/${profile?.organization_id}/projects/${profile?.project_id}/reports/action-reports/line-email?targets=all`}
        >
          <a className='flex justify-end mt-5 group'>
            <div className='flex items-center transform translate-x-2'>
              {t('returnToList')}
              <ChevronRightIcon
                scale={12}
                className='text-gray-600 group-hover:text-secondary'
                width={28}
                height={28}
                aria-hidden='true'
              />
            </div>
          </a>
        </Link>
      </div>
    </PrivateLayout>
  );
};

export default ByUrlReport;
export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'report'])),
  },
});
