import { Icon, Layout } from '@/components';
import { CSVButton } from '@/components/CSVButton/CSVButton';
import { CustomerReportButton } from '@/components/CustomerReportButton/CustomerReportButton';
import { CustomerSegmentTable } from '@/components/CustomerSegmentTable/CustomerSegmentTable';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const placeholder = [
  {
    target: 'f0',
    numOfCustomers: '',
    members: '234',
    other: '9,203',
    average: '',
    total: '',
    f1Sleep: '',
    royalSleep: '',
  },
  {
    target: 'f1',
    numOfCustomers: '19,404',
    members: '',
    other: '',
    average: '2,277',
    total: '4,180,440',
    f1Sleep: '',
    royalSleep: '',
  },
  {
    target: 'f2',
    numOfCustomers: '8,022',
    members: '',
    other: '',
    average: '2,612',
    total: '2,329,001',
    f1Sleep: '',
    royalSleep: '',
  },
  {
    target: 'semi-royal',
    numOfCustomers: '8,022',
    members: '',
    other: '',
    average: '2,612',
    total: '2,329,001',
    f1Sleep: '',
    royalSleep: '',
  },
  {
    target: 'royal',
    numOfCustomers: '19,404',
    members: '',
    other: '',
    average: '32,277',
    total: '4,180,440',
    f1Sleep: '',
    royalSleep: '',
  },
  {
    target: 'sleep',
    numOfCustomers: '154',
    members: '',
    other: '',
    average: '',
    total: '',
    f1Sleep: '124',
    royalSleep: '30',
  },
];

function Dashboard() {
  const { t } = useTranslation('dashboard');

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
        <CustomerSegmentTable data={placeholder} onClick={() => console.log('click')} />
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
            label={t('semiRoyalConversionRate')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='semi-royal-graduate' className='h-[25px] w-[65px]' />}
            label={t('royalConversionRate')}
          />
          <CustomerReportButton
            featuredIcon={<Icon name='royal-fluctuate' className='h-[25px] w-[65px]' />}
            label={t('royalCustomerTrend')}
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
            featuredIcon={<Icon name='royal-sleep-returned' className='h-[25px] w-[65px]' />}
            label={t('dormantRoyalCustomerReturnTrend')}
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
