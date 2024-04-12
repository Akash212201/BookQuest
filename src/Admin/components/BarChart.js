import React from 'react';
import Chart from './Chart';

const BarChart = () => {
    const options = {
        responsive: true,
        
      };

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: [7, 5, 10, 22],
        backgroundColor: 'rgb(13, 214, 184)',
        barThickness: 25,
      },
    ],
  };

  return <Chart type="bar" options={options} data={data}/>;
};

export default BarChart;
