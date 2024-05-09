import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LuShoppingBag } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import Search from './Search';
import { logout } from '../services/operations/authapi';

const Header1 = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const data = useSelector((state) => state.cart)
    const token = localStorage.getItem('token');
    const dispatch = useDispatch()
    const user = localStorage.getItem("user")
    const user1 = JSON.parse(user)
    // console.log(user1)

    function logouthandler() {
        dispatch(logout(navigate));
        setIsHovered(false)
    }

    const [inputVisible, setInputVisible] = useState(false)
    return (
        <>
            <div className='lg:px-8 px-3 py-3 flex justify-between items-center'>
                <div className="lg:text-4xl text-2xl">
                    <Link to="/">BookQuest</Link>
                </div>

                <div className="border border-green-500 lg:w-[50vw] rounded-xl lg:rounded-none overflow-hidden">
                    <div className="flex items-center">
                        {inputVisible && <Search />}
                        <button className="bg-green-500 text-xl py-[9px] px-3 text-white font-bold" onClick={() => setInputVisible(!inputVisible)}>
                            <IoSearch />
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center lg:w-[15vw] w-[30vw] lg:text-3xl">
                    {

                        <div className="flex items-center cursor-pointer lg:mr-0 mr-5 relative "
                            onMouseEnter={() => setIsHovered(true)}
                        >
                            <FiUser className="mr-2 " />
                            <div className={`absolute z-10 top-9 -left-14 bg-[#f0f4f9] px-6 py-2 rounded ${isHovered ? 'block' : 'hidden'} shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] `}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}>
                                <div className='text-lg px-2 text-center'>
                                    {
                                        token && user1 && user1.accountType === "Admin" && <Link to="/admin/dashboard" onClick={() => setIsHovered(false)}>DashBoard</Link>
                                    }
                                    {
                                        token && user1 && user1.accountType === "Customer" && <Link to="/user/dashboard/orders" onClick={() => setIsHovered(false)}>DashBoard</Link>
                                    }
                                </div>
                                {
                                    token && <div className='text-lg px-2 text-center' onClick={logouthandler}>Logout</div>

                                }
                                {
                                    !token && <Link to="/login">
                                        <div className="text-lg px-2 text-center">
                                            Login
                                        </div>
                                    </Link>
                                }
                            </div>
                            {/* User is available*/}
                        </div>
                    }
                    {
                        user === null ?
                            <Link to="/cart" >
                                <div className="flex items-center cursor-pointer relative">
                                    <LuShoppingBag className="lg:mr-2 mr-5" />
                                    <span className=' absolute -top-3 right-[2px] text-sm bg-green-500 text-white px-1 rounded-[50%]'>{data.cartItems.length}</span>
                                </div>
                            </Link> :
                            user1?.accountType === "Customer" ?
                                <Link to="/cart" >
                                    <div className="flex items-center cursor-pointer relative">
                                        <LuShoppingBag className="lg:mr-2 mr-5" />
                                        <span className=' absolute -top-3 right-[2px] text-sm bg-green-500 text-white px-1 rounded-[50%]'>{data.cartItems.length}</span>
                                    </div>
                                </Link> :
                                <></>
                    }
                    <div className="lg:hidden md:hidden cursor-pointer relative" >
                        <div className='w-[30px] h-[5px] mb-1 naviline1'></div>
                        <div className='w-[30px] h-[5px] mb-1 naviline2'></div>
                        <div className='w-[30px] h-[5px] naviline3'></div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header1