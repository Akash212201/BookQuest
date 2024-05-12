
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import RecentOrders from '../components/RecentOrders'
import DashBoardItems from '../components/DashBoardItems'

const Dashboard = () => {

  return (
    <div className="mt-6 mx-6">
      <DashBoardItems />

      <div className="flex lg:flex-row flex-col justify-evenly items-center gap-4 mt-6">
        <div className="relative lg:w-1/3 w-full h-[380px] px-6 py-2 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <h1 className="text-xl font-bold">Purchased Books</h1>
          <div className='border border-black'>
            <BarChart />
          </div>
        </div>
        <div className="relative lg:w-1/3 w-full h-[380px] bg-white px-6 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <h1 className="text-xl font-bold">Categories</h1>
          <PieChart />
        </div>
        <div className="relative lg:w-1/3 w-full h-[380px] bg-white px-6 py-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <h1 className="text-xl font-bold">Books Sale</h1>
          <LineChart />
        </div>
      </div>
      <h1 className="text-2xl mt-10 font-bold">Recent Orders</h1>
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
