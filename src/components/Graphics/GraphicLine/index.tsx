import React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface IProps {
  title: string;
  values: any[];
  height?: string;
  categories?: string[];
}

function GraphicLine({ title, values, height = '350px', categories = [] }: IProps) {
  const options: ApexCharts.ApexOptions = {
    title: {
      text: title,
      style: {
        color: 'var(--text-primary)',
      },
    },
    series: values,
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
    colors: ['var(--primary)', 'var(--background-complement)'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
      colors: ['var(--primary)'],
      width: 4,
    },

    grid: {
      row: {
        colors: ['var(--background-extra)', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: 'var(--text-primary)',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'var(--text-primary)',
        },
      },
    },
  };

  return (
    <>
      <ApexCharts options={options} series={options.series} type="line" width="100%" height={'100%'} />
    </>
  );
}

export default GraphicLine;
