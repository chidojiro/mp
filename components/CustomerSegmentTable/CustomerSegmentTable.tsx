import classNames from 'classnames';
import React from 'react';
import { Icon } from '@/components';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = CustomerSegmentTableProps;

export type CustomerSegmentTableProps = {
  /**
   * Array of data for generating cards. Array format is: [{
    target: 'f0', 
    numOfCustomers: '', 
    members: '234', 
    other: '9,203', 
    average: '', 
    total: '', 
    f1Sleep: '', 
    loyalSleep: '',
  }]
  */
  data: any[];
  semiLoyalSubtext?: string;
  loyalSubtext?: string;
  sleepSubtext?: string;
  onClick: (value: any) => void;
};

const dashboardCardHeaderClasses = (status: string, index: number, length: number) =>
  classNames({
    'bg-purple-500': status === 'f0',
    'bg-primary': status === 'f1',
    'bg-green-500': status === 'f2',
    'bg-secondary': status === 'semi-loyal',
    'bg-orange-500': status === 'loyal',
    'bg-sleepy': status === 'sleep',

    'rounded-tl-[10px]': index === 0,
    'rounded-tr-[10px]': index === length - 1,
    'border-r': index < length - 1,
    'flex flex-col text-white relative min-w-44 w-full h-20 flex items-center justify-end py-3 border-white':
      true,
  });

const dashboardCardBodyClasses = (index: number, length: number) =>
  classNames({
    'border-l rounded-bl-[10px]': index === 0,

    'rounded-br-[10px]': index === length - 1,

    'flex flex-col min-w-44 w-full h-40 border-r border-b border-gray-500': true,
  });

const getTriangleClasses = (dataSet: string) =>
  classNames({
    'absolute cursor-pointer': true,
    'right-[-15px]': dataSet !== 'loyal',
    'rotate-180 right-[-8px]': dataSet === 'loyal',
  });

const iconSource = (status: string) => {
  switch (status) {
    case 'f0':
      return 'f0-status';
    case 'f1':
      return 'f1-status';
    case 'f2':
      return 'f2-status';
    case 'semi-loyal':
      return 'semi-loyal-status';
    case 'loyal':
      return 'loyal-status';
    case 'sleep':
      return 'sleep-status';
    default:
      return 'f0-status';
  }
};

const getFirstDataPoint = (dataSet: {
  target: string;
  members: string;
  f1Sleep: string;
  average: string;
}) => {
  switch (dataSet.target) {
    case 'f0':
      return dataSet.members;
    case 'sleep':
      return dataSet.f1Sleep;
    default:
      return dataSet.average;
  }
};

const getSecondDataPoint = (dataSet: {
  target: string;
  other: string;
  loyalSleep: string;
  total: string;
}) => {
  switch (dataSet.target) {
    case 'f0':
      return dataSet.other;
    case 'sleep':
      return dataSet.loyalSleep;
    default:
      return dataSet.total;
  }
};

export const CustomerSegmentTable = ({
  semiLoyalSubtext,
  loyalSubtext,
  sleepSubtext,
  data,
  onClick,
  ...props
}: CustomerSegmentTableProps) => {
  const { t } = useTranslation('dashboard');

  const getFirstLabel = (target: string) => {
    switch (target) {
      case 'f0':
        return t('labelMember');
      case 'sleep':
        return t('labelF1Sleep');
      default:
        return t('labelAverage');
    }
  };

  const getSecondLabel = (target: string) => {
    switch (target) {
      case 'f0':
        return t('labelOther');
      case 'sleep':
        return t('labelLoyalDormant');
      default:
        return t('labelTotal');
    }
  };

  const getEndLabel = (target: string) => {
    switch (target) {
      case 'f0':
        return t('labelPeople');
      case 'sleep':
        return t('labelPeople');
      default:
        return t('labelYen');
    }
  };

  const SLData = (data: any) => {
    return (
      <>
        <div className='flex items-center container justify-between my-2'>
          <div className='text-left ml-6 bg-primary rounded-full text-white h-4 w-4 flex justify-center text-medium-sm'>
            S
          </div>
          <div className='text-right mr-6'>
            {data.webUsers}
            {t('labelPeople')} ({data.webPercentage}
            {t('labelPercent')})
          </div>
        </div>

        <div className='flex items-center container justify-between my-2'>
          <div className='text-left ml-6 bg-[#06C755] rounded-full text-white h-4 w-4 flex justify-center text-medium-sm'>
            L
          </div>
          <div className='text-right mr-6'>
            {data.lineUsers}
            {t('labelPeople')} ({data.linePercentage}
            {t('labelPercent')})
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='flex' {...props}>
      {data.map((dataSet, index) => {
        console.log('dataset:', dataSet);
        return (
          <div className='flex flex-col flex-1' key={dataSet.target}>
            <div className={dashboardCardHeaderClasses(dataSet.target, index, data.length)}>
              <div className='absolute -top-4'>
                <Icon name={iconSource(dataSet.target)} className='h-10 w-10' />
              </div>
              <div className='text-regular'>{t(dataSet.target)}</div>
              <div className='text-medium-sm'>{t(dataSet.target + 'Subtext')}</div>
            </div>
            <div className={dashboardCardBodyClasses(index, data.length)}>
              <div
                className={
                  dataSet.target === 'f0'
                    ? 'flex items-start my-[5px] justify-center h-full w-full relative'
                    : 'flex items-center justify-center h-full w-full relative'
                }
              >
                <div className='text-medium w-full'>
                  {dataSet.target !== 'f0' ? (
                    <div className='flex items-center container justify-end text-right my-2'>
                      <div className='mr-6 font-bold text-regular'>
                        {dataSet.numOfCustomers}
                        {t('labelPeople')}
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center container justify-between my-2'>
                      <div className='text-left ml-6'>{t('labelMember')}</div>
                      <div className='text-right mr-6 font-bold text-regular'>
                        {dataSet.members}
                        {t('labelPeople')}
                      </div>
                    </div>
                  )}

                  {SLData(dataSet)}

                  {dataSet.target !== 'f0' ? (
                    <div className='flex items-center container justify-between my-2'>
                      <div className='text-left ml-6'>{getFirstLabel(dataSet.target)}</div>
                      <div className='text-right mr-6'>
                        {getFirstDataPoint(dataSet)}
                        {getEndLabel(dataSet.target)}
                      </div>
                    </div>
                  ) : (
                    ''
                  )}

                  <div className='flex items-center container justify-between my-2'>
                    <div className='text-left ml-6'>{getSecondLabel(dataSet.target)}</div>
                    <div
                      className={
                        dataSet.target !== 'f0'
                          ? 'text-right mr-6'
                          : 'text-right mr-6 font-bold text-regular'
                      }
                    >
                      {getSecondDataPoint(dataSet)}
                      {getEndLabel(dataSet.target)}
                    </div>
                  </div>
                </div>
                {dataSet.target !== 'sleep' ? (
                  <div
                    className={getTriangleClasses(dataSet.target)}
                    onClick={() => onClick(dataSet.target)}
                  >
                    <Icon name='triangle-right' className='h-7 w-5' />
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerSegmentTable;