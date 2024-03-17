import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import MainPanel from '../components/MainPanel';

const Dashboard = () => {

  return (
    <div>
      <AdminNavbar />
      <div className={`admin h-[100vh] bg-background-color pt-[60px] `}>
        <AdminSidebar />
        <MainPanel/>
        
      </div>
    </div>
  );
};

export default Dashboard;
