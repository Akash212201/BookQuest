import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";


const AdminSidebar = () => {
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);

  return (
    <div className='bg-white w-full z-10 overflow-y-hidden'>
      <ul className='mt-[1rem] px-[1.45rem] mb-[60px]'>
        <li className='rounded-lg my-[0.2rem] px-4 py-2'>DashBoard</li>
        <li href="#!" className='rounded-lg my-[0.2rem] px-4 py-2 cursor-pointer nav-item'
          onClick={() => setProductMenuOpen(!productMenuOpen)}>
          <div className='flex items-center justify-between'>Books
            {productMenuOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {
            productMenuOpen && (
              <ul className='mt-[0.5rem]'>
                <li className='rounded-lg my-[0.2rem] px-4 py-2'>Add New Book</li>
                <li className='rounded-lg my-[0.2rem] px-4 py-2'>View All Books</li>
              </ul>
            )
          }
        </li>

        <li className='rounded-lg my-[0.5rem] px-4 py-2 cursor-pointer nav-item'
          onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}>

          <div className='flex items-center justify-between'>
            Category{categoryMenuOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {
            categoryMenuOpen && (
              <ul className='mt-[0.5rem]'>
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>Add New Category</li>
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>View All Categories</li>
              </ul>
            )
          }
        </li>
        <li className='rounded-lg my-[0.5rem] px-4 py-2 cursor-pointer nav-item'
          onClick={() => setOrderMenuOpen(!orderMenuOpen)}>
          <div className='flex items-center justify-between'>Orders
            {orderMenuOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>

          {
            orderMenuOpen && (
              <ul className='mt-[0.5rem]'>
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>New Orders</li>
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>Previous Orders</li>
              </ul>
            )
          }
        </li>
        <li className='rounded-lg my-[0.5rem] px-4 py-2 cursor-pointer'
          onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}>
          Users
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
