import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';
import { ServerSidePropsProvider } from '@/contexts';
import { SSR } from '@/ssr';
import { CustomerReportButton } from '@/components/dashboard';
import { Icon } from '@/components/common';
import { ConversionRateChart } from '@/components/ConversionRateChart';

export const getServerSideProps = SSR.withProps('profile')(async ({ locale }, result) => {
  return {
    ...result,
    props: {
      ...result.props,
      ...(await serverSideTranslations(locale!)),
    },
  };
});

const data = [
  {
    f1_uu: 232,
    f2_uu: 48,
    f2_conversion_rate: 20.7,
    created_at: '2021/6',
  },
  {
    f1_uu: 322,
    f2_uu: 78,
    f2_conversion_rate: 24.2,
    created_at: '2021/7',
  },
  {
    f1_uu: 289,
    f2_uu: 70,
    f2_conversion_rate: 24.2,
    created_at: '2021/8',
  },
  {
    f1_uu: 423,
    f2_uu: 120,
    f2_conversion_rate: 25.3,
    created_at: '2021/9',
  },
  {
    f1_uu: 399,
    f2_uu: 101,
    f2_conversion_rate: 28.4,
    created_at: '2021/10',
  },
  {
    f1_uu: 402,
    f2_uu: 118,
    f2_conversion_rate: 29.4,
    created_at: '2021/11',
  },
  {
    f1_uu: 411,
    f2_uu: 120,
    f2_conversion_rate: 29.2,
    created_at: '2021/12',
  },
  {
    f1_uu: 398,
    f2_uu: 112,
    f2_conversion_rate: 28.1,
    created_at: '2022/1',
  },
  {
    f1_uu: 422,
    f2_uu: 129,
    f2_conversion_rate: 30.6,
    created_at: '2022/2',
  },
  {
    f1_uu: 411,
    f2_uu: 120,
    f2_conversion_rate: 29.2,
    created_at: '2022/3',
  },
  {
    f1_uu: 398,
    f2_uu: 112,
    f2_conversion_rate: 28.1,
    created_at: '2022/4',
  },
  {
    f1_uu: 422,
    f2_uu: 129,
    f2_conversion_rate: 30.6,
    created_at: '2022/5',
  },
];

function F2ConversionRateTrends(props: any) {
  const { t } = useTranslation('report');
  const { t: tCommon } = useTranslation('common');

  return (
    <ServerSidePropsProvider props={props}>
      <Layout title={tCommon('loyalDormantCustomersReturn')}>
        <ConversionRateChart
          line={{ dataKey: 'f2_conversion_rate', title: t('returnRate') }}
          bar1={{ dataKey: 'f1_uu', title: t('numberOfLoyalDormantCustomers') }}
          bar2={{ dataKey: 'f2_uu', title: t('numberOfReturns') }}
          data={data}
        />
        <h5 className='text-gray-600 mt-[60px]'>
          {t('measuresThatContributedToReturnOfLoyalDormantCustomers')}
        </h5>
        <div className='grid grid-cols-2 gap-4 mt-6'>
          <CustomerReportButton
            featuredIcon={<Icon name='mails' size={30} />}
            label={t('postPurchaseStepDelivery')}
            subtext={t('mostRecentContribution', { amount: '256,000' })}
            clickActionText={t('viewReport')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='cart' size={30} />}
            label={t('periodicDeliveryRecommendation')}
            subtext={t('mostRecentContribution', { amount: '256,000' })}
            clickActionText={t('viewReport')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='chatbot' size={30} />}
            label={t('birthdayCoupon')}
            subtext={t('mostRecentContribution', { amount: '256,000' })}
            clickActionText={t('viewReport')}
          />
        </div>
      </Layout>
    </ServerSidePropsProvider>
  );
}

export default F2ConversionRateTrends;
