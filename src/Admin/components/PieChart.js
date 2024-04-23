import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { dashboardpiechart } from '../../services/operations/bookcategory';
import { useSelector } from 'react-redux';

const PieChart = () => {

  const [stats,setstats]=useState({})
  const {token}=useSelector((state)=>state.auth)

  useEffect(()=>{
    async function fetchdata(){
const resp=await dashboardpiechart(token);
console.log(resp.data)
setstats(resp.data)
    }
    fetchdata();

  },[])

  const options = {
    responsive: true,
  };


  const data = {
    labels: stats.categoryname,
    datasets: [
      {
        label: 'No of Books',
        data: stats.categorybooks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Chart type="pie" options={options} data={data} className="w-full h-full border border-black"/>;
};

export default PieChart;
