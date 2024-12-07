import React, { useState } from 'react'
import { FaTelegramPlane } from "react-icons/fa";
import newsletterImg from '../assests/undraw_newsletter_re_wrob.svg'
const Newsletter = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = () => {
        // console.log(email)
        setEmail('');
    }

    return (
        <div class="flex justify-center items-center flex-col mb-10">
            <div class="w-[95%] flex lg:flex-row flex-col items-center rounded-[30px] bg-gradient-to-br from-[#d5ffec] to-[#edfff7] lg:p-[60px] px-[20px] py-[30px]">
                <div class="lg:w-1/2 w-full">
                    <h2 className='lg:text-5xl text-2xl font-bold mb-4 text-[#212529]'>Stay Updated and increase
                     <br />your knowledge and thinking
                    </h2>
                    <p className='text-xl font-bold mb-4 text-[#4c4d4e]'>Subscribe to our newsletter and get latest updates of events,
                    book launch, reader's community trends and much mor
                    </p>
                    <br />
                    <div class="lg:w-[500px] w-[320px] flex justify-between items-center lg:gap-4 gap-2 bg-[#ffffff] ps-4 rounded-[50px]">
                        <FaTelegramPlane className='lg:text-[45px] text-[40px] text-[#6d6d6d]' />
                        <input type="text" placeholder="Your email address" className='w-full p-2 outline-none border-none lg:text-[1.5rem] text-[1rem]' />
                        <button class="lg:px-[25px] lg:py-[11px] px-[15px] py-[8px] text-white lg:text-[1.5rem] text-[1rem] rounded-[50px] bg-[#3beb9c] font-semibold hover:bg-[#47f3a6]" type="button">
                            Subscribe
                            
                        </button>
                    </div>
                </div>
                <div class="lg:w-1/2 w-full flex justify-end items-end">
                    <div className='w-[350px] h-[350px]'>
                        <img src={newsletterImg} class="w-full h-full opacity-70" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter