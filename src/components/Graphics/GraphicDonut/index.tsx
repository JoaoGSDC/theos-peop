import React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });
import { calculatePercentagesByTotal, calculatePercentagesByValues } from '../../../utils/calculatePercentages';

interface IProps {
  title: string;
  values: number[];
  labels: string[];
  height?: string;
  isPercentage?: boolean;
}

function GraphicDonut({ title, values, labels, height = '350px', isPercentage = true }: IProps) {
  const [series, setSeries] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (isPercentage) {
      const _series = calculatePercentagesByTotal(values);
      setSeries(_series);
      return;
    }

    const series = calculatePercentagesByValues(values);
    setSeries(series);
  }, [values]);

  const options: ApexCharts.ApexOptions = {
    title: { text: title },
    chart: {
      type: 'donut',
      foreColor: 'var(--text-secondary)',
    },
    series,
    labels,
    colors: ['var(--primary)', 'var(--background-complement)'],
    stroke: {
      colors: ['var(--primary)'],
      width: 1,
    },
  };

  return (
    <>
      <ApexCharts options={options} series={options.series} type="donut" width="100%" height={'100%'} />
    </>
  );
}

export default GraphicDonut;
