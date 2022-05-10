import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { CSVButton } from '@/components/common/Button';
import { Icon, IconName } from '@/components/common/Icon';
import { CustomerReportButton } from '@/components/CustomerReportButton';
import { RfmSegmentTable } from '@/components/dashboard';
import { Layout } from '@/components/Layout';
import { useProfile } from '@/hooks';
import { useReportData } from '@/hooks/api/useReportData';
import { SSR } from '@/ssr';
import { RfmReportDataItem } from '@/types/report';

export const getServerSideProps = SSR.withProps('rfmReport')(async ({ locale = 'ja' }, result) => {
  return {
    ...result,
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
});
export interface DashboardProps {
  rfmReport: RfmReportDataItem[];
}
function Dashboard(props: DashboardProps) {
  const { t } = useTranslation('dashboard');
  const { data } = useReportData('rfmReport', props.rfmReport);
  const { data: profile } = useProfile();

  const reportButtons = [
    {
      href: 'f2-conversion-rate',
      icon: 'f1-graduate',
      label: 'f2ConversionRate',
    },
    {
      href: 'semi-loyal-conversion-rate',
      icon: 'f2-graduate',
      label: 'semiLoyalConversionRate',
    },
    {
      href: 'loyal-conversion-rate',
      icon: 'semi-loyal-graduate',
      label: 'loyalConversionRate',
    },
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
    {
      href: 'f1-dormant-customers-return',
      icon: 'f1-sleep-returned',
      label: 'dormantF1CustomerReturnTrend',
    },
    {
      href: 'loyal-dormant-customers-return',
      icon: 'loyal-sleep-returned',
      label: 'dormantLoyalCustomerReturnTrend',
    },
  ];
  return (
    <Layout title={t('menuDashboard')}>
      <h4 className='mt-5 mb-2 text-gray-600 font-bold'>{t('dashboardCustomerAnalysis')}</h4>

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
    </Layout>
  );
}

export default Dashboard;
