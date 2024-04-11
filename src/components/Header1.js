import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LuShoppingBag } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import Search from './Search';
import Sidebar from './Sidebar'

const Header1 = () => {
    //temp user and id
    const user = { _id: "123", role: "admin" };
    const [showSidebar, setSidebar] = useState(false);
    const data = useSelector((state) => state.cart)
    console.log("data", data)

    const hideSidebar = () => {
        setSidebar(false);
    }
    return (
        <>
            <div className='lg:px-8 px-3 py-3 flex justify-between items-center'>
                <div className="lg:text-4xl text-2xl">
                    <Link to="/">BookQuest</Link>
                </div>

                <div className="border border-green-500 lg:w-[50vw] rounded-xl lg:rounded-none overflow-hidden">
                    <div className="flex items-center">
                        <Search />
                        <button className="bg-green-500 text-xl py-[9px] px-3 text-white font-bold">
                            <IoSearch />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center lg:w-[15vw] w-[30vw] lg:text-3xl">
                    {
                        user?._id ? (
                            <div className="flex items-center cursor-pointer lg:mr-0 mr-5 relative">
                                <FiUser className="mr-2 " />
                                <div className=' absolute z-10 top-9 -left-8 bg-[#f0f4f9] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                                    <div className='text-lg px-2 text-center'>
                                        <Link to="/admin/dashboard">DashBoard</Link>
                                    </div>
                                    <div className='text-lg px-2 text-center'>Logout</div>
                                </div>
                                {/* User is available*/}
                            </div>


                        ) : (
                            <Link to="/login">
                                <div className="flex items-center cursor-pointer lg:mr-0 mr-5">
                                    <FiUser className="mr-2" />
                                </div>
                            </Link>
                        )
                    }
                    <Link to="/cart" >
                        <div className="flex items-center cursor-pointer relative">
                            <LuShoppingBag className="lg:mr-2 mr-5" />
                            <span className=' absolute -top-3 right-[2px] text-sm bg-green-500 text-white px-1 rounded-[50%]'>{data.cartItems.length}</span>
                        </div>
                    </Link>
                    <div className="lg:hidden cursor-pointer relative" onClick={() => setSidebar(!showSidebar)} >
                        <div className='w-[30px] bg-black h-[5px] mb-1 naviline1'></div>
                        <div className='w-[30px] bg-black h-[5px] mb-1 naviline2'></div>
                        <div className='w-[30px] bg-black h-[5px] naviline3'></div>
                    </div>
                </div>
            </div>
            {showSidebar && <div className="z-10 absolute bg-white h-full w-full">
                <Sidebar hideSidebar={hideSidebar} />
            </div>
            }
        </>
    )
}

export default Header1