import { CSVButton } from '@/common/CSVButton';
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

export type ConversionRateChartProps = {
  charts: ChartInfo[];
  data: any[];
};

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const renderBar = (chartInfo: BarChartInfo) => {
  if (!chartInfo.stackedBars) {
    return (
      <Bar
        dataKey={chartInfo.dataKey}
        name={chartInfo.title}
        barSize={chartInfo.width ?? 16}
        fill={chartInfo.color}
        textAnchor='start'
        radius={[4, 4, 0, 0]}
        isAnimationActive={false}
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
      {chartInfo.stackedBars.map(({ color, dataKey, title, width }) => (
        <Bar
          key={dataKey}
          stackId={chartInfo.stackId}
          dataKey={dataKey}
          name={title}
          barSize={width ?? 16}
          fill={color}
          textAnchor='start'
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        >
          <LabelList
            dataKey={dataKey}
            formatter={(v: string) => numberWithCommas(parseInt(v))}
            position='top'
            stroke={chartInfo.color}
            fontSize={10}
          />
        </Bar>
      ))}
    </>
  );
};

const renderLine = (chartInfo: LineChartInfo) => {
  return (
    <Line
      yAxisId='right'
      // type='monotone'
      dot={false}
      strokeWidth={chartInfo.width ?? 2}
      dataKey={chartInfo.dataKey}
      name={chartInfo.title}
      unit='%'
      stroke={chartInfo.color}
      activeDot={false}
      isAnimationActive={false}
    >
      <LabelList
        dataKey={chartInfo.dataKey}
        position='top'
        stroke='#464646'
        formatter={(v: string) => v + '%'}
      />
    </Line>
  );
};

export const ConversionRateChart = ({ charts, data }: ConversionRateChartProps) => {
  if (DomUtils.isServer()) return <div></div>;

  const renderLegend = () => {
    return (
      <div className='flex items-center gap-8'>
        {charts.map(chart => {
          if (chart.type === 'BAR') {
            return (
              <React.Fragment key={chart.dataKey ?? chart.title}>
                <div className='flex items-center gap-2'>
                  {chart.legendIcon ?? (
                    <div className='w-3 h-3 rounded-sm' style={{ background: chart.color }}></div>
                  )}
                  {chart.title}
                </div>
                {(chart.stackedBars ?? []).map(stackedBar => (
                  <div className='flex items-center gap-2' key={stackedBar.dataKey}>
                    {stackedBar.legendIcon ?? (
                      <div
                        className='w-3 h-3 rounded-sm'
                        style={{ background: stackedBar.color }}
                      ></div>
                    )}
                    {stackedBar.title}
                  </div>
                ))}
              </React.Fragment>
            );
          }

          if (chart.type === 'LINE') {
            return (
              <div className='flex items-center gap-2' key={chart.dataKey ?? chart.title}>
                <div className='w-3 h-0.5 rounded-sm' style={{ background: chart.color }}></div>
                {chart.title}
              </div>
            );
          }

          return null;
        })}
      </div>
    );
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
          {renderCharts()}
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
