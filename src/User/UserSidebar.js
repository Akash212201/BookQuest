import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = ({ sidebarOpen }) => {

    return (
        <div className={`admin-sidebar bg-white ${sidebarOpen ? 'lg:hidden' : 'hide'}`}>
            <ul className='mt-[1rem] px-[1.45rem] mb-[60px]'>
                <li className='rounded-lg my-[0.2rem] px-4 py-2'>
                    <Link to="/admin/dashboard">DashBoard</Link>
                </li>
                <li className='rounded-lg my-[0.2rem] px-4 py-2'>
                    <Link to="/user/dashboard/orders">View All Books</Link>
                </li>
            </ul>
        </div>
    );
}

export default UserSidebar;
