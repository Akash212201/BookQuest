import React, { useState } from 'react'
import { FaTelegramPlane } from "react-icons/fa";
const Newsletter = () => {
    const [email,setEmail] = useState('');
    const handleSubmit = () =>{
        console.log(email)
        setEmail('');
    }

  return (
    <div className="news py-[65px] bg-[#333] flex justify-center items-center flex-col">
        <div className="container mx-auto">
            <h2 className="lg:text-6xl text-3xl text-center text-white">Subscribe to BookQuest Newsletter</h2>
            <div className='border lg:w-[50vw] w-[65vw] mx-auto flex justify-center items-center px-1 my-3'>
                <input type="email" className="w-[95%] py-2 outline-none bg-transparent text-white" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button className="text-4xl text-white" onClick={handleSubmit}>
                    <FaTelegramPlane />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Newsletter