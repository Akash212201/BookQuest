import React from 'react';
import { IoIosMenu, IoIosSearch } from "react-icons/io";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <div className="header lg:flex">
      <div className='lg:px-[2.375rem] px-[0.75rem] w-[25%] flex justify-between items-center'>
        <h1 className='text-2xl'>BookQuest</h1>
       <IoIosMenu className='z-10 text-[1.25rem] cursor-pointer mr-2 border border-black' onClick={toggleSidebar} />
      </div>
      <div className='flex items-center text-[#6C7383] px-[2.375rem] py-1 lg:w-[80%] w-[60%] border border-green-500'>
        <div className='flex justify-between items-center w-full'>
          
          <div className='flex items-center w-[300px] p-[0.5rem] ml-10'>
            <IoIosSearch className='text-[2.25rem] cursor-pointer ' />
            <input type="text" className='w-full outline-none text-[#6c7383] px-2 py-1' placeholder='Search Now' />
          </div>
          <div className='flex items-center justify-center rounded-[50%] overflow-hidden border w-[50px] h-[50px]'>
            <img src="./1.jpg" alt="" className='w-full h-full object-cover' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;