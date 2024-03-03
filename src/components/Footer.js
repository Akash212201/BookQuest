import React from 'react'
import { MdLocalPhone, MdAttachEmail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
    const footerLink = [
        {
            title: "Company",
            links: ["About Us", "Privacy Policy", "Terms of Use"],
        },
        {
            title: "Resource",
            links: ["Contact", "Help"],
        },
    ]

    return (
        <div className='text-white'>
            <div className='bg-[#2f2f2f] flex pt-10 pb-5 px-5 lg:flex-row flex-col'>
                <div className='w-full lg:w-1/3'>
                    <h1 className='text-4xl'>BookQuest</h1>
                    <p className='text-sm'>At BookQuest we are working towards enhencing your reading experience to the web by providing an extensive range of books spanning from Fiction, Non-Fiction, Literature, Classics and many more...</p>
                    <div className='flex items-center text-base my-2'>
                        <MdLocalPhone className='mr-3' /> +91 9149215780
                    </div>
                    <div className='flex items-center text-base mb-2'>
                        <GrMapLocation className='mr-3' /> Sultanpur, Uttar Pradesh
                    </div>
                    <div className='flex items-center text-base my-2'>
                        <MdAttachEmail className='mr-3' /> agrawal.138658@gmail.com
                    </div>
                </div>
                <div className='flex justify-evenly lg:w-2/3 w-full lg:flex-row flex-col'>
                    {
                        footerLink.map((flinks, idx) => (

                            <div key={idx} className='lg:mb-0 mb-4'>
                                <h2 className="text-2xl">{flinks.title}</h2>
                                <ul>
                                    {
                                        flinks.links.map((link, idxx) => (

                                            <li key={idxx}>{link}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                    <div className='text-center'>
                        <img src="../images/worldmap.png" alt="" />
                        <div className='flex lg:justify-center items-center mt-3'>
                            <FaLinkedinIn className='m-2 text-3xl rounded p-1 hover:bg-slate-100 cursor-pointer hover:text-black transition' />
                            <FaFacebookF className='m-2 text-3xl rounded p-1 hover:bg-slate-100 cursor-pointer hover:text-black transition' />
                            <FaInstagram className='m-2 text-3xl rounded p-1 hover:bg-slate-100 cursor-pointer hover:text-black transition' />
                            <FaTwitter className='m-2 text-3xl rounded p-1 hover:bg-slate-100 cursor-pointer hover:text-black transition' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center text-lg bg-[#333] py-3'>© 2024 BookQuest , All rights reserved.</div>
        </div>
    )
}

export default Footer