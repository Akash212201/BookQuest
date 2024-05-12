import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Chart = ({ type, options, data }) => {
  switch (type) {
    case 'bar':
      return <Bar options={options} data={data} className=' absolute bottom-5 ' />;
    case 'line':
      return <Line options={options} data={data} className=' absolute bottom-5' />;
    case 'pie':
      return <Pie options={options} data={data} className=' w-full h-full' />;
    default:
      return null;
  }
};

export default Chart;
