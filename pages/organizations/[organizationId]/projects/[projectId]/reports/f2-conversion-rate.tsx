import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Icon, IconName } from '@/components/common/Icon';
import { ConversionRateChart } from '@/components/ConversionRateChart';
import { CustomerReportButton } from '@/components/CustomerReportButton';
import { Layout } from '@/components/Layout';
import { useProfile } from '@/hooks/api/useProfile';
import { NumberUtils } from '@/utils';

export const getServerSideProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!)),
    },
  };
};

const data = [
  {
    f1_uu: 3053,
    f2_uu: 226,
    f2_conversion_rate: 7.4,
    created_at: '2021/6',
  },
  {
    f1_uu: 2335,
    f2_uu: 176,
    f2_conversion_rate: 7.5,
    created_at: '2021/7',
  },
  {
    f1_uu: 2286,
    f2_uu: 207,
    f2_conversion_rate: 9.1,
    created_at: '2021/8',
  },
  {
    f1_uu: 2070,
    f2_uu: 138,
    f2_conversion_rate: 6.7,
    created_at: '2021/9',
  },
  {
    f1_uu: 1752,
    f2_uu: 123,
    f2_conversion_rate: 7.0,
    created_at: '2021/10',
  },
  {
    f1_uu: 1929,
    f2_uu: 148,
    f2_conversion_rate: 7.7,
    created_at: '2021/11',
  },
  {
    f1_uu: 2374,
    f2_uu: 210,
    f2_conversion_rate: 8.8,
    created_at: '2021/12',
  },
  {
    f1_uu: 1997,
    f2_uu: 167,
    f2_conversion_rate: 8.4,
    created_at: '2022/1',
  },
  {
    f1_uu: 1765,
    f2_uu: 131,
    f2_conversion_rate: 7.4,
    created_at: '2022/2',
  },
  {
    f1_uu: 1629,
    f2_uu: 118,
    f2_conversion_rate: 7.2,
    created_at: '2022/3',
  },
  {
    f1_uu: 1704,
    f2_uu: 138,
    f2_conversion_rate: 8.1,
    created_at: '2022/4',
  },
  {
    f1_uu: 1811,
    f2_uu: 154,
    f2_conversion_rate: 8.5,
    created_at: '2022/5',
  },
];

function F2ConversionRateTrends() {
  const { t } = useTranslation('report');
  const { t: tCommon } = useTranslation('common');
  const { data: profile } = useProfile();

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
    <Layout title={tCommon('f2ConversionRateTrends')}>
      <ConversionRateChart
        line={{ dataKey: 'f2_conversion_rate', title: t('f2ConversionRate') }}
        bar1={{ dataKey: 'f1_uu', title: t('numberOfF1Customers') }}
        bar2={{ dataKey: 'f2_uu', title: t('numberOfF2Customers') }}
        data={data}
      />
      <h5 className='text-gray-600 mt-[60px] font-bold'>
        {t('measuresThatContributedToF2Conversion')}
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
    </Layout>
  );
}

export default F2ConversionRateTrends;
