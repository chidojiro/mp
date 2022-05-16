import { Bar, LabelList } from 'recharts';
import { BarChartInfo } from '../types';

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { chartInfo: BarChartInfo };

// eslint-disable-next-line no-empty-pattern
export const BarChart = ({ chartInfo }: Props) => {
  if (!chartInfo.stackedBars) {
    return (
      <Bar
        dataKey={chartInfo.dataKey}
        name={chartInfo.title}
        barSize={chartInfo.width ?? 16}
        fill={chartInfo.color}
        textAnchor='start'
        radius={[4, 4, 0, 0]}
      >
        <LabelList
          dataKey={chartInfo.dataKey}
          // formatter={(v: string) => numberWithCommas(parseInt(v))}
          position='top'
          stroke='#FFBA00'
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
        >
          <LabelList
            dataKey={dataKey}
            formatter={(v: string) => numberWithCommas(parseInt(v))}
            position='top'
            stroke='#FFBA00'
            fontSize={10}
          />
        </Bar>
      ))}
    </>
  );
};
