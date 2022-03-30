import { ConversionRateChart, CustomerReportButton, Icon, Layout } from '@/components';
import { ServerSidePropsProvider } from '@/contexts';
import { SSR } from '@/ssr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
    bar2: 189,
    created_at: '2021/6',
  },
  {
    f1_uu: 322,
    f2_uu: 78,
    bar2: 368,
    created_at: '2021/7',
  },
  {
    f1_uu: 289,
    f2_uu: 70,
    bar2: 343,
    created_at: '2021/8',
  },
  {
    f1_uu: 423,
    f2_uu: 120,
    bar2: 387,
    created_at: '2021/9',
  },
  {
    f1_uu: 399,
    f2_uu: 101,
    bar2: 447,
    created_at: '2021/10',
  },
  {
    f1_uu: 402,
    f2_uu: 118,
    bar2: 449,
    created_at: '2021/11',
  },
  {
    f1_uu: 411,
    f2_uu: 120,
    bar2: 450,
    created_at: '2021/12',
  },
  {
    f1_uu: 398,
    f2_uu: 112,
    bar2: 379,
    created_at: '2022/1',
  },
  {
    f1_uu: 422,
    f2_uu: 129,
    bar2: 380,
    created_at: '2022/2',
  },
  {
    f1_uu: 411,
    f2_uu: 120,
    bar2: 352,
    created_at: '2022/3',
  },
  {
    f1_uu: 398,
    f2_uu: 112,
    bar2: 382,
    created_at: '2022/4',
  },
  {
    f1_uu: 422,
    f2_uu: 129,
    bar2: 440,
    created_at: '2022/5',
  },
];

function F2ConversionRateTrends(props: any) {
  const { t } = useTranslation('report');
  const { t: tCommon } = useTranslation('common');

  return (
    <ServerSidePropsProvider props={props}>
      <Layout title={tCommon('numberOfLoyalCustomers')}>
        <ConversionRateChart
          bar1={{ dataKey: 'f1_uu', title: t('numberOfLoyalCustomers') }}
          bar2={{ dataKey: 'bar2', title: t('numberOfSemiLoyalCustomers') }}
          bar3={{ dataKey: 'f2_uu', title: t('loyalDormantCustomers') }}
          data={data}
        />
        <h5 className='text-gray-600 mt-[60px]'>{t('measuresContributingToLoyaltyConversion')}</h5>
        <div className='grid grid-cols-2 gap-4 mt-6'>
          <CustomerReportButton
            featuredIcon={<Icon name='mails' size={30} />}
            label={t('postPurchaseStepDelivery')}
            subtext={t('mostRecentContribution', { amount: '356,000' })}
            clickActionText={t('viewReport')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='cart' size={30} />}
            label='条件付き送料無料'
            subtext={t('mostRecentContribution', { amount: '273,000' })}
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
