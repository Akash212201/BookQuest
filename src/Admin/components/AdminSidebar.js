import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const AdminSidebar = ({ sidebarOpen }) => {
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [orderMenuOpen, setOrderMenuOpen] = useState(false);

  return (
    <div className={`bg-white w-full z-10 overflow-y-hidden ${sidebarOpen ? 'hidden' : ''} `}>
      <ul className='mt-[1rem] px-[1.45rem] mb-[60px]'>
        <li className='rounded-lg my-[0.2rem] px-4 py-2'>
          <Link to="/admin/dashboard">DashBoard</Link>
        </li>
        <li className='rounded-lg my-[0.2rem] px-4 py-2 cursor-pointer nav-item'
          onClick={() => setProductMenuOpen(!productMenuOpen)}>
          <div className='flex items-center justify-between'>Books
            {productMenuOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {
            productMenuOpen && (
              <ul className='mt-[0.5rem]'>
                <li className='rounded-lg my-[0.2rem] px-4 py-2'>
                  <Link to="/admin/dashboard/addproduct">Add New Book</Link>
                </li>
                <li className='rounded-lg my-[0.2rem] px-4 py-2'>
                  <Link to="/admin/dashboard/products">View All Books</Link>
                </li>
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
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>
                  <Link to="/admin/dashboard/addcategory">Add New Category</Link>
                </li>
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>
                  <Link to="/admin/dashboard/categories">View All Categories</Link>
                </li>
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
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>
                  <Link to="/new-orders">New Orders</Link>
                </li>
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>
                  <Link to="#!">Previous Orders</Link>
                </li>
              </ul>
            )
          }
        </li>
        <li className='rounded-lg my-[0.5rem] px-4 py-2 cursor-pointer'
          onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}>
          <Link to="#!">Users</Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
