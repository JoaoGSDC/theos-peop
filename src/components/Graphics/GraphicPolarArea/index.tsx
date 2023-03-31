import React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  title: string;
  values: number[];
  labels?: string[];
}

function GraphicPolarArea({ title, labels = [], values }: IProps) {
  const [series, setSeries] = React.useState<number[]>(values);

  const options: ApexCharts.ApexOptions = {
    title: { text: title },
    chart: {
      type: 'polarArea',
      foreColor: 'var(--text-primary)',
    },
    series,
    labels,
    colors: ['var(--primary)', 'var(--tertiary)'],
    stroke: {
      colors: ['var(--primary)'],
      width: 1,
    },
  };

  return (
    <>
      <ApexCharts options={options} series={options.series} type="polarArea" width="100%" height={'100%'} />
    </>
  );
}

export default GraphicPolarArea;
