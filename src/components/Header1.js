import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import { LuShoppingBag } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import Search from './Search';
import MobileNav from './MobileNav';

const Header1 = () => {
    const [nav, setNav] = useState(false)
    return (
       <>
        <div className='lg:px-8 px-3 py-3 flex justify-between items-center'>
            <div className="lg:text-4xl text-2xl"><Link to="/">BookQuest</Link></div>

            <div className="border border-red-500 lg:w-[50vw] rounded-xl lg:rounded-none overflow-hidden">
                <div className="flex items-center">
                    <Search/>
                    <button className="bg-red-500 text-xl py-[9px] px-3 text-white font-bold">
                        <IoSearch />
                    </button>
                </div>
            </div>

            <div className="flex justify-evenly items-center lg:w-[20vw] w-[30vw] lg:text-xl">
                <div className="flex items-center cursor-pointer lg:mr-0 mr-5">
                    <FiUser className="mr-2" /><p className="lg:block hidden">My Account</p>
                </div>
                <Link to="/cart">
                    <div className="flex items-center cursor-pointer">
                        <LuShoppingBag className="lg:mr-2 mr-5" /><p className="lg:block hidden">Cart</p>
                    </div>
                </Link>
                <div className="lg:hidden cursor-pointer relative" onClick={()=>setNav(!nav)}>
                    <div className='w-[30px] bg-black h-[5px] mb-1 naviline1'></div>
                    <div className='w-[30px] bg-black h-[5px] mb-1 naviline2'></div>
                    <div className='w-[30px] bg-black h-[5px] naviline3'></div>
                </div>
            </div>
        </div>
        { nav && <div className="z-10 absolute bg-white h-full w-full"><MobileNav /></div>}
       </>
    )
}

export default Header1