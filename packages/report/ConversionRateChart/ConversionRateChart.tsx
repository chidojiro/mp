import { CSVButton } from '@/common/CSVButton';
import { Children } from '@/common/types';
import { DomUtils } from '@/common/utils';
import React from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  LabelList,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChartInfo, ChartInfo, LineChartInfo } from '../types';
import styles from './ConversionRateChart.module.css';
import { Legends } from './Legends';

export type ConversionRateChartProps = Children & {
  charts: ChartInfo[];
  data: any[];
  legend?: React.ReactNode | null;
};

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const renderBar = (chartInfo: BarChartInfo) => {
  if (!chartInfo.stackedBars) {
    return (
      <Bar
        dataKey={chartInfo.dataKey ?? ''}
        name={chartInfo.title}
        barSize={chartInfo.width ?? 16}
        fill={chartInfo.color}
        textAnchor='start'
        radius={[4, 4, 0, 0]}
        isAnimationActive={false}
        yAxisId='left'
      >
        <LabelList
          dataKey={chartInfo.dataKey}
          // formatter={(v: string) => numberWithCommas(parseInt(v))}
          position='top'
          stroke={chartInfo.color}
          fontSize={10}
        />
      </Bar>
    );
  }

  return (
    <>
      {chartInfo.stackedBars.map(({ color, dataKey, title }, idx) => (
        <Bar
          key={dataKey}
          stackId={chartInfo.stackId ?? 'stacked-bar'}
          dataKey={dataKey}
          name={title}
          barSize={chartInfo.width ?? 16}
          fill={color}
          textAnchor='start'
          radius={idx === chartInfo.stackedBars!.length - 1 ? [4, 4, 0, 0] : undefined}
          isAnimationActive={false}
          yAxisId='left'
        >
          <LabelList
            dataKey={dataKey}
            formatter={(v: string) => numberWithCommas(parseInt(v))}
            position='insideTop'
            stroke='#fff'
            fontSize={10}
          />
        </Bar>
      ))}
    </>
  );
};

const renderLine = ({
  axis = 'right',
  width = 2,
  dataKey,
  title,
  color,
  labelProps,
  ...restChartInfo
}: LineChartInfo) => {
  return (
    <Line
      yAxisId={axis}
      // type='monotone'
      dot={false}
      strokeWidth={width}
      dataKey={dataKey}
      name={title}
      unit={axis === 'right' ? '%' : ''}
      stroke={color}
      activeDot={false}
      isAnimationActive={false}
    >
      <LabelList
        dataKey={dataKey}
        position='top'
        stroke='#464646'
        formatter={(v: string) => (axis === 'right' ? v + '%' : v)}
        {...labelProps}
      />
    </Line>
  );
};

export const ConversionRateChart = ({
  charts,
  data,
  legend,
  children,
}: ConversionRateChartProps) => {
  if (DomUtils.isServer()) return <div></div>;

  const renderLegend = () => {
    if (legend !== undefined) return legend;

    const legends = charts.map(({ color, title, type }) => ({ color, title, type }));

    return <Legends items={legends} />;
  };

  const renderCharts = () => {
    return charts.map(chart => {
      if (chart.type === 'BAR') return renderBar(chart);
      if (chart.type === 'LINE') return renderLine(chart);

      return null;
    });
  };

  return (
    <div>
      <div className='flex items-end justify-between px-16 mb-4'>
        {renderLegend()}
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
            dataKey='aggregated_month'
          ></XAxis>
          <YAxis
            tickLine={false}
            tick={{ fontSize: 12, color: '#464646' }}
            tickMargin={12}
            yAxisId='left'
            stroke='#BFBFBF'
            domain={[0, (dataMax: number) => Math.round(dataMax * 1.2)]}
            allowDataOverflow
          />
          <YAxis
            tickLine={false}
            tick={{ fontSize: 12, color: '#464646' }}
            tickMargin={12}
            tickFormatter={tick => tick + '%'}
            stroke='#BFBFBF'
            yAxisId='right'
            orientation='right'
            allowDataOverflow
          />
          {renderCharts()}
          <Tooltip />
          {children}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
