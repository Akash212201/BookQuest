import React from 'react'
import { Link } from 'react-router-dom'

const MobileNav = () => {
  return (
    <div className=" flex justify-center h-full bg-green-500 text-center pt-10 text-2xl text-white">
      <ul>
        <li className='py-2'><Link to="/"> Home</Link></li>
        <li className='py-2'><Link to="/newarrival"> New Arrival</Link></li>
        <li className='py-2'><Link to="/bestseller"> Best Seller</Link></li>
        <li className='py-2'><Link to="/fiction"> Fiction</Link></li>
        <li className='py-2'><Link to="/scifi"> SciFi</Link></li>
      </ul>
    </div>
  )
}

export default MobileNav