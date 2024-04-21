import React,{ useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import ProfileCard from '../../components/ProfileCard';
import userimg from "../../assests/profileImg.png"

const AdminNavbar = ({ toggleSidebar }) => {
  const user=localStorage.getItem("user")
  const user1=user && JSON.parse(user)
  const [isVisible,setIsVisible] = useState(false);
  return (
    <div className="header flex">
      <div className='lg:px-[2.375rem] px-[0.75rem] w-[25%] flex justify-between items-center'>
       <Link to="/" className='lg:text-4xl text-2xl'><h1>BookQuest</h1></Link>
      </div>
      <div className='flex justify-between items-center text-[#6C7383] px-[0.5rem] py-1 lg:w-[80%] w-[60%]'>
       <IoIosMenu className='z-10 text-[1.25rem] cursor-pointer mr-2' onClick={toggleSidebar} />
        <div className='flex items-center justify-center rounded-[50%] overflow-hidden border w-[50px] h-[50px] relative cursor-pointer' 
        onClick={() => setIsVisible(!isVisible)}>
            <img src={user1?.image || userimg} alt="" className='w-full h-full object-cover' />
          </div>
           { isVisible && <ProfileCard/> }
      </div>
    </div>
  );
};

export default AdminNavbar;