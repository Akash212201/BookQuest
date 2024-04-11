import React from 'react';
import { IoIosMenu, IoIosSearch } from "react-icons/io";

const AdminNavbar = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <div className='px-[2.375rem] text-2xl w-[20%]'>Logo Here</div>
      <div className='flex items-center text-[#6C7383] px-[2.375rem] py-1 w-[80%]'>
        <IoIosMenu className='text-[1.25rem] cursor-pointer mr-2' onClick={toggleSidebar} />
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