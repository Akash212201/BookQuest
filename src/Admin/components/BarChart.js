import React, { useEffect, useState } from 'react';
import Chart from './Chart';

import { dashboardbarchart } from '../../services/operations/bookcategory';
import { useSelector } from 'react-redux';

const BarChart = () => {
  const options = {
    responsive: true,

  };

  const [stats, setstats] = useState({})
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {

    const fetchdata = async () => {
      try {
        const resp = await dashboardbarchart(token);
        console.log(resp.data)
        setstats(resp.data)
      } catch (error) {
        console.log(error)
      }

    }
    fetchdata();


  }, [])

  const data = {
    labels: stats.bookname,
    datasets: [
      {
        label: 'Users',
        data: stats.totalusers,
        backgroundColor: 'rgb(13, 214, 184)',
        barThickness: 25,
      },
    ],
  };

  return <Chart type="bar" options={options} data={data} />;
};

export default BarChart;
