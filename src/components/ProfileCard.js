import React from 'react'
import { Link } from 'react-router-dom'
import userImg from '../assests/profileImg.png'
const ProfileCard = () => {
    const user=localStorage.getItem("user")
    const user1=JSON.parse(user)
    return (
        <div className='min-w-[250px] duration-300 flex flex-col justify-center items-center top-16 right-6 z-10 bg-white rounded-lg p-[1rem] absolute shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
            <div className="flex justify-center items-center rounded-full w-[60px] h-[60px]">
                <img src={user1.image} alt="" className=' object-cover' />
            </div>
            <h1 className='text-[1.5rem] mt-[0.5rem] font-bold leading-[1.5rem] tracking-wider'>{user1.firstName}{" "}{user1.lastName}</h1>
            <p className='text-[1rem] font-medium tracking-wider'>{user1.email}</p>
            <span className='block border boder-black w-full mt-4 text-[a2a2a2b0]'></span>
            <div className='w-full'>
                <Link to="/user/dashboard/profile">
                    <button className='mt-5 text-left px-4 py-2 rounded hover:bg-green-500 hover:text-white tracking-wider block w-full'>
                        My Profile
                    </button>
                </Link>
              {
                user1 && user1.accountType==="Customer" && 
                <Link to="/user/dashboard/orders">
                <button className='block text-left px-4 py-2 rounded hover:bg-green-500 hover:text-white tracking-wider w-full'>
                    My Orders
                </button>
            </Link>
              }

              {
                user1 && user1.accountType==="Admin" &&
                <Link to="/admin/dashboard/orders">
                <button className='block text-left px-4 py-2 rounded hover:bg-green-500 hover:text-white tracking-wider w-full'>
                  Orders
                </button>
            </Link>
              }
            </div>
            <Link to="/user/dashboard/profile">
                <button className='block mt-5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold'>
                    Update Profile
                </button>
            </Link>
        </div>
    )
}

export default ProfileCard