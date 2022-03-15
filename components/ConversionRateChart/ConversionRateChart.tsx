import { NextUtils } from '@/utils';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { CSVButton } from '../CSVButton';
import styles from './ConversionRateChart.module.css';

export type ConversionRateChartProps = {
  bar1: ChartInfo;
  bar2?: ChartInfo;
  bar3?: ChartInfo;
  line?: ChartInfo;
  data: any[];
};

export type ChartInfo = {
  dataKey: string;
  title: string;
};

export const ConversionRateChart = ({ bar1, bar2, bar3, line, data }: ConversionRateChartProps) => {
  if (NextUtils.isServer()) return <div></div>;

  const barWidth = bar3 ? 16 : 24;

  return (
    <div>
      <div className='flex items-end justify-between px-16 mb-4'>
        <div className='flex items-center gap-8'>
          <div className='flex items-center gap-2'>
            <div className='w-3 h-3 rounded-sm bg-secondary'></div>
            {bar1.title}
          </div>
          {!!bar2 && (
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-sm bg-primary'></div>
              {bar2.title}
            </div>
          )}
          {!!bar3 && (
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-sm bg-danger'></div>
              {bar3.title}
            </div>
          )}
          {!!line && (
            <div className='flex items-center gap-2'>
              <div className='w-3 h-0.5 rounded-sm bg-danger'></div>
              {line.title}
            </div>
          )}
        </div>
        <CSVButton />
      </div>
      <ResponsiveContainer width='100%' height={400}>
        <ComposedChart data={data} className={styles['conversion-rate-chart']}>
          <CartesianGrid vertical={false} stroke='#E6E6E6' />
          <XAxis
            tickLine={false}
            tick={{ fontSize: 12, color: '#464646' }}
            tickMargin={12}
            stroke='#BFBFBF'
            dataKey='created_at'
          ></XAxis>
          <YAxis
            tickLine={false}
            tick={{ fontSize: 12, color: '#464646' }}
            tickMargin={12}
            stroke='#BFBFBF'
          />
          <YAxis
            tickLine={false}
            tick={{ fontSize: 12, color: '#464646' }}
            tickMargin={12}
            tickFormatter={tick => tick + '%'}
            stroke='#BFBFBF'
            yAxisId='right'
            orientation='right'
          />
          <Bar dataKey={bar1.dataKey} barSize={barWidth} fill='#FFBA00' textAnchor='start'>
            <LabelList dataKey={bar1.dataKey} position='top' stroke='#FFBA00' fontSize={10} />
          </Bar>
          {!!bar2 && (
            <Bar dataKey={bar2.dataKey} barSize={barWidth} fill='#55C5D9' textAnchor='start'>
              <LabelList dataKey={bar2.dataKey} position='top' stroke='#55C5D9' fontSize={10} />
            </Bar>
          )}
          {!!bar3 && (
            <Bar dataKey={bar3.dataKey} barSize={barWidth} fill='#FF7F5C' textAnchor='start'>
              <LabelList dataKey={bar3.dataKey} position='top' stroke='#FF7F5C' fontSize={10} />
            </Bar>
          )}
          {!!line && (
            <Line
              yAxisId='right'
              type='monotone'
              dataKey={line.dataKey}
              stroke='#FF7D58'
              activeDot={false}
            >
              <LabelList
                dataKey={line.dataKey}
                position='top'
                stroke='#464646'
                formatter={(v: string) => v + '%'}
              />
            </Line>
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
