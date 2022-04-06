import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ConversionRateChart, CustomerReportButton, Icon, Layout } from '@/components';
import { ServerSidePropsProvider } from '@/contexts';
import { SSR } from '@/ssr';

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

function F2ConversionRateTrends(props: any) {
  const { t } = useTranslation('report');
  const { t: tCommon } = useTranslation('common');

  return (
    <ServerSidePropsProvider props={props}>
      <Layout title={tCommon('f2ConversionRateTrends')}>
        <ConversionRateChart
          line={{ dataKey: 'f2_conversion_rate', title: t('f2ConversionRate') }}
          bar1={{ dataKey: 'f1_uu', title: t('numberOfF1Customers') }}
          bar2={{ dataKey: 'f2_uu', title: t('numberOfF2Customers') }}
          data={data}
        />
        <h5 className='text-gray-600 mt-[60px]'>{t('measuresThatContributedToF2Conversion')}</h5>
        <div className='grid grid-cols-2 gap-4 mt-6'>
          <CustomerReportButton
            featuredIcon={<Icon name='mails' size={30} />}
            label='購入後ステップ配信'
            subtext={t('mostRecentContribution', { amount: '556,000' })}
            clickActionText={t('viewReport')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='cart' size={30} />}
            label='かご落ち通知'
            subtext={t('mostRecentContribution', { amount: '351,000' })}
            clickActionText={t('viewReport')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='chatbot' size={30} />}
            label='レコメンド診断ボット（静的）'
            subtext={t('mostRecentContribution', { amount: '216,000' })}
            clickActionText={t('viewReport')}
          />
        </div>
      </Layout>
    </ServerSidePropsProvider>
  );
}

export default F2ConversionRateTrends;
