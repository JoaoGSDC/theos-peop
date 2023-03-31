import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

function GraphicBar() {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
    },
    series: [
      {
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  return (
    <>
      <ApexCharts options={options} series={options.series} type="bar" width="100%" height={350} />
    </>
  );
}

export default GraphicBar;
