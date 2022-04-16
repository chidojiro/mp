import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Icon } from '@/components/common/Icon';
import { Layout } from '@/components/Layout';
import { RfmSegmentTable } from '@/components/dashboard';
import { CSVButton } from '@/components/common/Button';
import { SSR } from '@/ssr';
import { useReportData } from '@/hooks/api/useReportData';
import { RfmReportDataItem } from '@/types/report';
import { CustomerReportButton } from '@/components/CustomerReportButton';

export const getServerSideProps = SSR.withProps('rfmReport')(async ({ locale = 'ja' }, result) => {
  return {
    ...result,
    props: {
      ...result.props,
      ...(await serverSideTranslations(locale)),
    },
  };
});
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DashboardProps {
  rfmReport: RfmReportDataItem[];
}
function Dashboard(props: DashboardProps) {
  const { t } = useTranslation('dashboard');
  const { data } = useReportData('rfmReport', props.rfmReport);

  return (
    <Layout title={t('menuDashboard')}>
      <h4 className='mt-5 mb-2 text-gray-600'>{t('dashboardCustomerAnalysis')}</h4>

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
          <CustomerReportButton
            featuredIcon={<Icon name='f1-graduate' className='h-[25px] w-[65px]' />}
            label={t('f2ConversionRate')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='f2-graduate' className='h-[25px] w-[65px]' />}
            label={t('semiLoyalConversionRate')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='semi-loyal-graduate' className='h-[25px] w-[65px]' />}
            label={t('loyalConversionRate')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='loyal-fluctuate' className='h-[25px] w-[65px]' />}
            label={t('loyalCustomerTrend')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='sleep-returned' className='h-[25px] w-[65px]' />}
            label={t('dormantCustomerReturnTrend')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='f1-sleep-returned' className='h-[25px] w-[65px]' />}
            label={t('dormantF1CustomerReturnTrend')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='loyal-sleep-returned' className='h-[25px] w-[65px]' />}
            label={t('dormantLoyalCustomerReturnTrend')}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
