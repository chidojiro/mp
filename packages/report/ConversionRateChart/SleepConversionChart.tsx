import { Legends } from './Legends';
import { ConversionRateChart } from './ConversionRateChart';
import { Colors } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import { omitBy } from 'lodash-es';
import { NumberUtils } from '@/common/utils';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { data: any; type: 'loyal' | 'total' | 'f1' };

// eslint-disable-next-line no-empty-pattern
export const SleepConversionChart = ({ data, type }: Props) => {
  const { t } = useTranslation('report');

  const getTranslationKey = () => {
    switch (type) {
      case 'loyal':
        return 'numberOfLoyalDormantCustomers';
      case 'total':
        return 'numberOfDormantCustomers';
      case 'f1':
        return '';
      default:
        return '';
    }
  };

  const displayData = data
    .sort((a: any, b: any) => a.aggregated_month - b.aggregated_month)
    .map(({ aggregated_month, ...rest }: any) => ({
      ...rest,
      aggregated_month: aggregated_month.split('-').slice(0, 2).join('/'),
    }))
    .slice(0, 12)
    .map((data: any) => omitBy(data, v => !v));

  return (
    <ConversionRateChart
      legend={
        <Legends
          items={[
            { color: '#FF7F5C', title: t(getTranslationKey()) },
            { color: '#91D5E2', title: t('numberOfReturningCustomers') },
            { color: Colors.primary.DEFAULT, title: t('numberOfReturningCustomersDif') },
            { color: Colors.gray[500], title: t('numberOfDefectedCustomers') },
            { color: Colors.secondary.DEFAULT, title: t('returnRate') },
          ]}
        />
      }
      charts={[
        {
          type: 'BAR',
          stackedBars: [
            { color: '#91D5E2', dataKey: 'recovery_uu', title: t('numberOfReturningCustomers') },
            {
              color: Colors.primary.DEFAULT,
              dataKey: 'latest_recovery_uu',
              title: t('numberOfReturningCustomersDif'),
            },
            {
              color: Colors.gray[500],
              dataKey: 'deep_sleep_uu',
              title: t('numberOfDefectedCustomers'),
            },
            { color: '#FF7F5C', dataKey: 'sleep_uu', title: t(getTranslationKey()) },
          ],
          color: Colors.secondary.DEFAULT,
          width: 32,
        },
        {
          type: 'LINE',
          dataKey: 'recovery_rate',
          color: Colors.secondary.DEFAULT,
          labelProps: {
            fontSize: 10,
          },
          title: t('returnRate'),
          formatter: v => NumberUtils.formatPercent(parseFloat(v)) + '%',
        },
        {
          type: 'LINE',
          dataKey: 'total_uu',
          color: 'transparent',
          width: 1,
          axis: 'left',
          labelProps: {
            fontSize: 12,
          },
        },
      ]}
      data={displayData}
    />
  );
};
