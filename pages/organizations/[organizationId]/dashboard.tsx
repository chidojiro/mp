import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CustomerSegmentTable } from '@/components/CustomerSegmentTable/CustomerSegmentTable';
import { CustomerReportButton } from '@/components/CustomerReportButton/CustomerReportButton';
import { CSVButton } from '@/components/CSVButton/CSVButton';
import { Icon } from '@/components/common/Icon/Icon';

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
  }
];

function Dashboard() {
  const { t } = useTranslation();

  return (
    <Layout title={t('menuDashboard')}>
      <h4 className="text-gray-600 mb-2 mt-5">顧客分析</h4>

      <div className="w-full flex justify-between items-end mb-10" >
        <div className="flex">
          <div className="font-bold mr-5">期間</div>
          <div>直近180日間</div>
        </div>
        <CSVButton />
      </div>

      <div className="w-full mb-12" ><CustomerSegmentTable data={placeholder} onClick={() => console.log('click')} /></div>

      <h4 className="text-gray-600 mb-5">レポート</h4>

      <div className="w-full mb-20" >
        <div className="grid grid-cols-2 grid-rows-4 gap-[10px]">
          <CustomerReportButton featuredIcon={<Icon name="f1-graduate" className="h-[25px] w-[65px]" />} label="F2転換率推移" />
          <CustomerReportButton featuredIcon={<Icon name="f2-graduate" className="h-[25px] w-[65px]" />} label="準ロイヤル転換率推移" />
          <CustomerReportButton featuredIcon={<Icon name="semi-royal-graduate" className="h-[25px] w-[65px]" />} label="ロイヤル転換率推移" />
          <CustomerReportButton featuredIcon={<Icon name="royal-fluctuate" className="h-[25px] w-[65px]" />} label="ロイヤル顧客数推移" />
          <CustomerReportButton featuredIcon={<Icon name="sleep-returned" className="h-[25px] w-[65px]" />} label="休眠顧客復帰推移" />
          <CustomerReportButton featuredIcon={<Icon name="f1-sleep-returned" className="h-[25px] w-[65px]" />} label="F1休眠顧客復帰推移" />
          <CustomerReportButton featuredIcon={<Icon name="royal-sleep-returned" className="h-[25px] w-[65px]" />} label="ロイヤル休眠顧客復帰推移" />
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
