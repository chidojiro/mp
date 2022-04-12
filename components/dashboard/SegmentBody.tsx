import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { NumberUtils } from '@/utils/number';

import { SegmentBodyProps } from './dashboard.types';

const MemberTypeFragment = ({
  count,
  percentage,
  memberType,
  t,
}: {
  count: number;
  percentage: number;
  memberType: 'W' | 'L';
  t: (key: string) => string;
}) => {
  return (
    <div className='container flex items-center justify-between my-2'>
      <div
        className={classNames(
          'flex justify-center w-4 h-4 ml-6 mr-2 text-left text-white rounded-full bg-primary text-medium-sm',
          memberType === 'L' && 'bg-[#06C755]'
        )}
      >
        {memberType}
      </div>
      <div className='mr-6 text-right flex items-center justify-center'>
        <div className='mr-2 whitespace-nowrap'>
          {NumberUtils.formatQuantity(count)}
          {t('labelPeople')}
        </div>
        <div>
          ({NumberUtils.formatPercent(percentage ?? 0)}
          {t('labelPercent')})
        </div>
      </div>
    </div>
  );
};

const GeneralFragmnet = ({ label, value, unit, boldValue = false }: any) => {
  return (
    <div className='container flex items-center justify-between my-2'>
      <div className='ml-6 text-left whitespace-nowrap'>{label}</div>
      <div
        className={classNames(
          'text-right mr-6 whitespace-nowrap',
          boldValue && 'font-bold text-regular'
        )}
      >
        {value}
        {unit}
      </div>
    </div>
  );
};
const getTriangleClasses = (dataSet: string) =>
  classNames({
    'absolute cursor-pointer': true,
    'right-[-15px]': dataSet !== 'loyal',
    'rotate-180 right-[-8px]': dataSet === 'loyal',
  });
export const SegmentBody = ({ data }: SegmentBodyProps) => {
  const { t } = useTranslation('dashboard');
  return (
    <div className='flex items-center justify-center h-full w-full relative'>
      <div className='w-full text-medium h-full'>
        <GeneralFragmnet
          label={data.target === 'f0' ? t('labelOther') : ''}
          unit={t('labelPeople')}
          boldValue
          value={NumberUtils.formatQuantity(
            data.target === 'f0' ? data.members! : data.numOfCustomers!
          )}
        />

        <MemberTypeFragment
          count={data.webUsers}
          percentage={data.webPercentage}
          memberType='W'
          t={t}
        />
        <MemberTypeFragment
          count={data.lineUsers}
          percentage={data.linePercentage}
          memberType='L'
          t={t}
        />
        {data.target === 'f0' && (
          <GeneralFragmnet
            label={t('labelOther')}
            unit={t('labelPeople')}
            boldValue
            value={data.other!}
          />
        )}
        {!['f0', 'sleep'].includes(data.target) && (
          <GeneralFragmnet
            label={t('labelAverage')}
            unit={t('labelYen')}
            value={NumberUtils.formatAverage(data.average!)}
          />
        )}
        {data.target === 'sleep' && (
          <GeneralFragmnet
            label={t('labelF1Sleep')}
            unit={t('labelPeople')}
            value={NumberUtils.formatQuantity(data.f1Sleep!)}
          />
        )}
        {data.target !== 'f0' && (
          <GeneralFragmnet
            label={data.target === 'sleep' ? t('labelLoyalDormant') : t('labelTotal')}
            value={
              data.target === 'sleep'
                ? NumberUtils.formatQuantity(data.loyalSleep!)
                : NumberUtils.formatMoney(data.total!)
            }
            unit={data.target === 'sleep' ? t('labelPeople') : t('labelYen')}
          />
        )}
      </div>
    </div>
  );
};
