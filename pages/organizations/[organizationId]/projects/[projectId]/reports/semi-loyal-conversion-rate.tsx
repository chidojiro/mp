import { useProfile } from '@/auth/useProfile';
import { Icon, IconName } from '@/common/Icon';
import { NumberUtils } from '@/common/utils';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { ReportApis } from '@/report/apis';
import { ConversionRateChart } from '@/report/ConversionRateChart';
import { CustomerReportButton } from '@/report/CustomerReportButton';
import { Colors } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import useSWR from 'swr';

export const getServerSideProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!)),
    },
  };
};

function SemiRoyalConversionRate() {
  const { t } = useTranslation('report');
  const { t: tCommon } = useTranslation('common');
  const { data: profile } = useProfile();

  const { data = [] } = useSWR('/next-royal-conversion-rate', () =>
    ReportApis.getNextLoyalConversionRate()
  );

  const chartData = data
    .sort((a: any, b: any) => a.aggregated_month - b.aggregated_month)
    .map(({ aggregated_month, ...rest }: any) => ({
      ...rest,
      aggregated_month: aggregated_month.split('-').slice(0, 2).join('/'),
    }))
    .slice(0, 12);

  const reportButtons = [
    {
      href: `/organizations/${profile?.organization_id}/projects/${profile?.project_id}/reports/action-reports/step-delivery-after-purchase/monthly?targets=all`,
      icon: 'mails',
      label: t('postPurchaseStepDelivery'),
      subLabel: t('mostRecentContribution', { amount: NumberUtils.formatMoney(256000) }),
    },
    {
      href: `/organizations/${profile?.organization_id}/projects/${profile?.project_id}/reports/action-reports/conditional-free-shipping/monthly?targets=all`,
      icon: 'cart',
      label: t('viewFreeShippingReport'),
      subLabel: t('mostRecentContribution', { amount: NumberUtils.formatMoney(48300) }),
    },
    {
      href: '',
      icon: 'chatbot',
      label: t('viewBirthdayCouponReport'),
      subLabel: t('mostRecentContribution', { amount: NumberUtils.formatMoney(37600) }),
    },
  ];
  return (
    <PrivateLayout title={tCommon('semiLoyalConversionRate')}>
      <ConversionRateChart
        charts={[
          {
            type: 'BAR',
            dataKey: 'f2_uu',
            title: t('numberOfF2Customers'),
            color: Colors.secondary.DEFAULT,
            width: 24,
          },
          {
            type: 'BAR',
            dataKey: 'next_loyal_uu',
            title: t('numberOfSemiLoyalCustomers'),
            color: Colors.primary.DEFAULT,
            width: 24,
          },
          {
            type: 'LINE',
            dataKey: 'next_loyal_conversion_rate',
            title: t('semiLoyalConversionRate'),
            color: Colors.danger,
          },
        ]}
        data={chartData}
      />
      <h5 className='text-gray-600 mt-[60px] font-bold'>
        {t('measuresThatContributedToSemiLoyalConversion')}
      </h5>
      <div className='grid grid-cols-2 gap-4 mt-6'>
        {reportButtons.map((button, index) => (
          <CustomerReportButton
            key={index}
            href={button.href}
            featuredIcon={<Icon name={button.icon as IconName} size={30} />}
            label={button.label}
            subtext={button.subLabel}
            clickActionText={t('viewReport')}
          />
        ))}
      </div>
    </PrivateLayout>
  );
}

export default SemiRoyalConversionRate;
