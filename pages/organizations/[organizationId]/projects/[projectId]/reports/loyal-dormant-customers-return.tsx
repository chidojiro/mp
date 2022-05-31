import { useProfile } from '@/auth/useProfile';
import { Icon, IconName } from '@/common/Icon';
import { NumberUtils } from '@/common/utils';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { ReportApis } from '@/report/apis';
import { ConversionRateChart, Legends } from '@/report/ConversionRateChart';
import { CustomerReportButton } from '@/report/CustomerReportButton';
import { Colors } from '@/theme/constants';
import { omitBy } from 'lodash-es';
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

function LoyalSleepCustomersReturn() {
  const { t } = useTranslation('report');
  const { t: tCommon } = useTranslation('common');
  const { data: profile } = useProfile();

  const { data = [] } = useSWR('/loyal-sleep-recovery', () => ReportApis.getLoyalSleepRecovery());

  const chartData = data
    .sort((a: any, b: any) => a.aggregated_month - b.aggregated_month)
    .map(({ aggregated_month, ...rest }: any) => ({
      ...rest,
      aggregated_month: aggregated_month.split('-').slice(0, 2).join('/'),
    }))
    .slice(0, 12)
    .map((data: any) => omitBy(data, v => !v));

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
    <PrivateLayout title={tCommon('loyalDormantCustomersReturn')}>
      <ConversionRateChart
        legend={
          <Legends
            items={[
              { color: '#FF7F5C', title: t('numberOfLoyalDormantCustomers') },
              { color: '#91D5E2', title: t('numberOfReturningCustomers') },
              { color: Colors.primary.DEFAULT, title: t('numberOfReturningCustomersDif') },
              { color: Colors.gray[500], title: t('numberOfDefectedCustomers') },
              { color: Colors.secondary.DEFAULT, title: t('returnRate') },
            ]}
          />
        }
        charts={[
          {
            type: 'BAR',
            stackedBars: [
              { color: '#91D5E2', dataKey: 'recovery_uu' },
              { color: Colors.primary.DEFAULT, dataKey: 'latest_recovery_uu' },
              { color: Colors.gray[500], dataKey: 'deep_sleep_uu' },
              { color: '#FF7F5C', dataKey: 'sleep_uu' },
            ],
            color: Colors.secondary.DEFAULT,
            width: 32,
          },
          {
            type: 'LINE',
            dataKey: 'total_uu',
            color: 'transparent',
            width: 1,
            axis: 'left',
            labelProps: {
              fontSize: 12,
            },
          },
          {
            type: 'LINE',
            dataKey: 'recovery_rate',
            color: Colors.secondary.DEFAULT,
            labelProps: {
              fontSize: 10,
            },
          },
        ]}
        data={chartData}
      />
      <h5 className='text-gray-600 mt-[60px] font-bold'>
        {t('measuresThatContributedToReturnOfLoyalDormantCustomers')}
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

export default LoyalSleepCustomersReturn;
