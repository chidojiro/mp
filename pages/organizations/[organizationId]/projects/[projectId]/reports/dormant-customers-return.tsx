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

function ReturnOfDormantCustomers(props: any) {
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
      <PrivateLayout title={tCommon('returnOfDormantCustomers')}>
        <ConversionRateChart
          charts={[
            {
              type: 'BAR',
              dataKey: 'f1_uu',
              title: t('numberOfDormantCustomers'),
              color: Colors.secondary.DEFAULT,
              width: 24,
            },
            {
              type: 'BAR',
              dataKey: 'f2_uu',
              title: t('numberOfReturns'),
              color: Colors.primary.DEFAULT,
              width: 24,
            },
            {
              type: 'LINE',
              dataKey: 'f2_conversion_rate',
              title: t('returnRate'),
              color: Colors.danger,
            },
          ]}
          data={data}
        />
        <h5 className='text-gray-600 mt-[60px] font-bold'>
          {t('measuresThatContributedToTheReturnOfDormantCustomers')}
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

export default ReturnOfDormantCustomers;
