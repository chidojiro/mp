import { LabelList, Line } from 'recharts';
import { LineChartInfo } from '../types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { chartInfo: LineChartInfo };

// eslint-disable-next-line no-empty-pattern
export const LineChart = ({ chartInfo }: Props) => {
  console.log(chartInfo.dataKey);
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
