import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Icon, IconName } from '@/common/Icon';
import { NumberUtils } from '@/common/utils';
import { ConversionRateChart } from '@/report/ConversionRateChart';
import { CustomerReportButton } from '@/report/CustomerReportButton';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { ServerSidePropsProvider } from '@/ssr/ServerSidePropsContext';
import { SsrUtils } from '@/ssr/utils';
import { useProfile } from '@/auth/useProfile';
import { Colors } from '@/theme/constants';

export const getServerSideProps = SsrUtils.withProps('profile')(
  async ({ locale = 'ja' }, result) => {
    return {
      ...result,
      props: {
        ...result.props,
        ...(await serverSideTranslations(locale!)),
      },
    };
  }
);

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
    <ServerSidePropsProvider props={props}>
      <PrivateLayout title={tCommon('numberOfLoyalCustomers')}>
        <ConversionRateChart
          charts={[
            {
              type: 'BAR',
              dataKey: 'f1_uu',
              title: t('numberOfLoyalCustomers'),
              color: Colors.secondary.DEFAULT,
              width: 16,
            },
            {
              type: 'BAR',
              dataKey: 'bar2',
              title: t('numberOfSemiLoyalCustomers'),
              color: Colors.primary.DEFAULT,
              width: 16,
            },
            {
              type: 'BAR',
              dataKey: 'f2_uu',
              title: t('loyalDormantCustomers'),
              color: Colors.danger,
              width: 16,
            },
          ]}
          data={data}
        />
        <h5 className='text-gray-600 mt-[60px] font-bold'>
          {t('measuresContributingToLoyaltyConversion')}
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
    </ServerSidePropsProvider>
  );
}

export default F2ConversionRateTrends;
