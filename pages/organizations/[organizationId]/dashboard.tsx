import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomerSegmentTable } from '@/components/CustomerSegmentTable/CustomerSegmentTable';
import { CustomerReportButton } from '@/components/CustomerReportButton/CustomerReportButton';
import { CSVButton } from '@/components/CSVButton/CSVButton';
import { Icon } from '@/components';

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

  return (
    <Layout title={t('menuDashboard')}>
      <h4 className='text-gray-600 mb-2 mt-5'>{t('dashboardCustomerAnalysis')}</h4>

      <div className='w-full flex justify-between items-end mb-10'>
        <div className='flex'>
          <div className='font-bold mr-5'>{t('timePeriod')}</div>
          <div>{t('dashboardPeriodLast180Days')}</div>
        </div>
        <CSVButton />
      </div>

      <div className='w-full mb-12'>
        <CustomerSegmentTable data={placeholder} onClick={() => console.log('click')} />
      </div>

      <h4 className='text-gray-600 mb-5'>{t('labelReport')}</h4>

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
