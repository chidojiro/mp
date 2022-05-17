import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CSVButton } from '@/common/CSVButton';
import { Icon, IconName } from '@/common/Icon';
import { CustomerReportButton } from '@/report/CustomerReportButton';
import { RfmSegmentTable } from '@/dashboard/RfmSegmentTable';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { useReport } from '@/report/useReport';
import { SsrUtils } from '@/ssr/utils';
import { RfmReportDataItem } from '@/report/types';
import { useProfile } from '@/auth/useProfile';

export const getServerSideProps = SsrUtils.withProps('rfmReport')(
  async ({ locale = 'ja' }, result) => {
    return {
      ...result,
      props: {
        ...(await serverSideTranslations(locale)),
      },
    };
  }
);
export interface DashboardProps {
  rfmReport: RfmReportDataItem[];
}
function Dashboard(props: DashboardProps) {
  const { t } = useTranslation('dashboard');
  const { data } = useReport('rfmReport', props.rfmReport);
  const { data: profile } = useProfile();

  const reportButtons = [
    {
      href: 'f2-conversion-rate',
      icon: 'f1-graduate',
      label: 'f2ConversionRate',
    },
    // {
    //   href: 'semi-loyal-conversion-rate',
    //   icon: 'f2-graduate',
    //   label: 'semiLoyalConversionRate',
    // },
    // {
    //   href: 'loyal-conversion-rate',
    //   icon: 'semi-loyal-graduate',
    //   label: 'loyalConversionRate',
    // },
    {
      href: 'loyal-customers',
      icon: 'loyal-fluctuate',
      label: 'loyalConversionRate',
    },
    {
      href: 'dormant-customers-return',
      icon: 'sleep-returned',
      label: 'dormantCustomerReturnTrend',
    },
    // {
    //   href: 'f1-dormant-customers-return',
    //   icon: 'f1-sleep-returned',
    //   label: 'dormantF1CustomerReturnTrend',
    // },
    {
      href: 'loyal-dormant-customers-return',
      icon: 'loyal-sleep-returned',
      label: 'dormantLoyalCustomerReturnTrend',
    },
  ];
  return (
    <PrivateLayout title={t('menuDashboard')}>
      <h4 className='mt-5 mb-2 font-bold text-gray-600'>{t('dashboardCustomerAnalysis')}</h4>

      <div className='flex items-end justify-between w-full mb-10'>
        <div className='flex'>
          <div className='mr-5 font-bold'>{t('timePeriod')}</div>
          <div>{t('dashboardPeriodLast180Days')}</div>
        </div>
        <CSVButton />
      </div>

      <div className='w-full mb-12'>{!!data && <RfmSegmentTable data={data} />}</div>

      <h4 className='mb-5 text-gray-600'>{t('labelReport')}</h4>

      <div className='w-full'>
        <div className='grid grid-cols-2 grid-rows-4 gap-[10px]'>
          {reportButtons.map(button => (
            <CustomerReportButton
              key={button.href}
              href={`/organizations/${profile?.organization_id}/projects/${profile?.project_id}/reports/${button.href}`}
              featuredIcon={<Icon name={button.icon as IconName} className='h-[25px] w-[65px]' />}
              label={t(button.label)}
            />
          ))}
        </div>
      </div>
    </PrivateLayout>
  );
}

export default Dashboard;
