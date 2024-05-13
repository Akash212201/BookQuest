import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

const AdminSidebar = ({ sidebarOpen }) => {
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [usersMenuOpen, setUsersMenuOpen] = useState(false); 

  return (
    <div className={`admin-sidebar bg-white ${sidebarOpen? 'lg:hidden' :'hide'}`}>
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
                  <Link to="/admin/dashboard/addbook">Add New Book</Link>
                </li>
                <li className='rounded-lg my-[0.2rem] px-4 py-2'>
                  <Link to="/admin/dashboard/books">View All Books</Link>
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
          >
          <Link to="/admin/dashboard/orders">Orders</Link>
         

             
           
        </li>
        <li className='rounded-lg my-[0.5rem] px-4 py-2 cursor-pointer nav-item'
          onClick={() => setUsersMenuOpen(!usersMenuOpen)}>
          <div className='flex items-center justify-between'>Users
            {usersMenuOpen? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
          </div>
          {
            usersMenuOpen && (
              <ul className='mt-[0.5rem]'> 
                {/* <li className='rounded-lg my-[0.5rem] px-4 py-2'>
                  <Link to="/admin/dashboard/authors">Authors</Link>
            </li>*/}
                <li className='rounded-lg my-[0.5rem] px-4 py-2'>
                  <Link to="/admin/dashboard/allusers">Users</Link>
                </li>
              </ul>
            )
          }
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
