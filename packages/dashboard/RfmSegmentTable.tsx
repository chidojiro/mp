import { Icon, IconName } from '@/common/Icon';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { SegmentBody } from './SegmentBody';
import { RfmSegmentTableProps } from './types';

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
    'flex flex-col text-white relative min-w-44 w-full flex items-center justify-end p-3 border-white':
      true,
  });

const dashboardCardBodyClasses = (index: number, length: number) =>
  classNames({
    'border-l rounded-bl-[10px]': index === 0,
    'rounded-br-[10px]': index === length - 1,
    'flex flex-col min-w-44 w-full border-r border-b border-gray-500': true,
  });

const getTriangleClasses = (dataSet: string) =>
  classNames({
    'absolute cursor-pointer top-[45%]': true,
    'right-[-15px]': dataSet !== 'loyal',
    'rotate-180 right-[-8px]': dataSet === 'loyal',
  });

const getIconName = (target: string) => `${target}-status` as IconName;

export const RfmSegmentTable = ({ data, ...props }: RfmSegmentTableProps) => {
  const { t } = useTranslation('dashboard');

  return (
    <div className='flex' {...props}>
      {data.map((dataSet, index) => {
        return (
          <div className='flex flex-col flex-1' key={dataSet.target}>
            <div className={dashboardCardHeaderClasses(dataSet.target, index, data.length)}>
              <div className='absolute -top-4'>
                <Icon name={getIconName(dataSet.target)} className='w-10 h-10' />
              </div>
              <div className='text-regular mt-4 font-bold'>{t(dataSet.target)}</div>
              <div className='text-medium-sm font-bold whitespace-nowrap'>
                {t(dataSet.target + 'Subtext')}
              </div>
            </div>
            <div className={dashboardCardBodyClasses(index, data.length)}>
              <div className='flex flex-1 relative'>
                <SegmentBody data={dataSet} />
                {dataSet.target !== 'sleep' && (
                  <div className={getTriangleClasses(dataSet.target)}>
                    <Icon name='triangle-right' className='w-5 h-7' />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RfmSegmentTable;
