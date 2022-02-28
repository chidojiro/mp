import { ReportApi } from '@/apis';
import { Icon, Layout } from '@/components';
import { CSVButton } from '@/components/CSVButton/CSVButton';
import { CustomerReportButton } from '@/components/CustomerReportButton/CustomerReportButton';
import { CustomerSegmentTable } from '@/components/CustomerSegmentTable/CustomerSegmentTable';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState } from 'react';
import useSWR from 'swr';

const placeholder = [
  {
    target: 'f0',
    numOfCustomers: '',
    members: '234',
    other: '9,203',
    average: '',
    total: '',
    f1Sleep: '',
    loyalSleep: '',
  },
  {
    target: 'f1',
    numOfCustomers: '19,404',
    members: '',
    other: '',
    average: '2,277',
    total: '4,180,440',
    f1Sleep: '',
    loyalSleep: '',
  },
  {
    target: 'f2',
    numOfCustomers: '8,022',
    members: '',
    other: '',
    average: '2,612',
    total: '2,329,001',
    f1Sleep: '',
    lSleep: '',
  },
  {
    target: 'semi-loyal',
    numOfCustomers: '8,022',
    members: '',
    other: '',
    average: '2,612',
    total: '2,329,001',
    f1Sleep: '',
    loyalSleep: '',
  },
  {
    target: 'loyal',
    numOfCustomers: '19,404',
    members: '',
    other: '',
    average: '32,277',
    total: '4,180,440',
    f1Sleep: '',
    loyalSleep: '',
  },
  {
    target: 'sleep',
    numOfCustomers: '154',
    members: '',
    other: '',
    average: '',
    total: '',
    f1Sleep: '124',
    loyalSleep: '30',
  },
];

function Dashboard() {
  const { t } = useTranslation('dashboard');
  const [report, setReport] = useState(null);
  const { data, error } = useSWR('/api/user', ReportApi.rfm_report, {
    fallbackData: placeholder,
  });
  console.log(data);
  // useEffect(() => {
  //     const loadData = async () => {
  //       const result = await ReportApi.rfm_report();
  //       setReport(result.data.result)
  //     }
  //     loadData()
  //   }, [report])

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

      <div className='w-full mb-12'>
        {!!data && <CustomerSegmentTable data={data} onClick={() => console.log('click')} />}
      </div>

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

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default Dashboard;
