import React from 'react'

import { Link } from 'react-router-dom';
import { MdLocalPhone, MdAttachEmail, MdEmail } from "react-icons/md";
import { GrMapLocation } from "react-icons/gr";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaLocationPin } from "react-icons/fa6";
import { FaClock, FaHeadphones, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {

    const footerItems = [
        {
            title: "Company",
            items: [
                {
                    item: "Account",
                    path: "/",
                },
                {
                    item: "Delivery Information",
                    path: "/",
                },
                {
                    item: "Privacy Policy",
                    path: "/",
                },
                {
                    item: "Terms & Conditions",
                    path: "/",
                },
                {
                    item: "Contact Us",
                    path: "/",
                },
                {
                    item: "Support Center",
                    path: "/",
                },
                {
                    item: "Careers",
                    path: "/",
                },
            ]
        },
        {
            title: "Company",
            items: [
                {
                    item: "Account",
                    path: "/",
                },
                {
                    item: "Delivery Information",
                    path: "/",
                },
                {
                    item: "Privacy Policy",
                    path: "/",
                },
                {
                    item: "Terms & Conditions",
                    path: "/",
                },
                {
                    item: "Contact Us",
                    path: "/",
                },
                {
                    item: "Support Center",
                    path: "/",
                },
                {
                    item: "Careers",
                    path: "/",
                },
            ]
        },
        {
            title: "Popular",
            items: [
                {
                    item: "Event",
                    path: "/",
                },
                {
                    item: "Book Launch",
                    path: "/",
                },
                {
                    item: "Community",
                    path: "/",
                },
                {
                    item: "New Arrival",
                    path: "/",
                },

            ]
        },
    ]
    return (
        <footer className='flex justify-center items-center flex-col pb-2'>
            <div class="w-[95%]">
                <div class="flex lg:flex-row flex-col justify-between items-start">
                    <div class="lg:w-[30%] md:w-[50%] w-full">
                        <Link to="/" className='text-4xl'>BookQuest</Link>
                        <br /><br />
                        <p>A place to find all types of books hustle free. </p>
                        <br />
                        <p className='flex items-center gap-2 lg:mb-3 mb-1'>
                            <FaLocationPin className='text-[#218659] text-xl'/>
                            <strong>Address</strong>: Aligarh, Uttar Pradesh
                        </p>
                        <p className='flex items-center gap-2 lg:mb-3 mb-1'>
                            <FaHeadphones className='text-[#218659] text-xl'/>
                            <strong>Call Us:</strong>(+91)9149215780</p>

                        <p className='flex items-center gap-2 lg:mb-3 mb-1'>
                            <MdEmail className='text-[#218659] text-xl'/>
                            <strong>Email:</strong>contact@bookquest.com
                        </p>
                        <p className='flex items-center gap-2 lg:mb-3 mb-1'>
                            <FaClock className='text-[#218659] text-xl'/>
                            <strong>Hours:</strong>10:00 - 18:00, Mon - Fri
                        </p>
                    </div>
                    <div class="lg:w-[70%] w-full">

                        <div class="flex flex-wrap justify-between items-start">
                            {
                                footerItems.map((footerItem, idx) => (
                                    <div class="col" key={idx}>
                                        <h3 className='text-[1.25rem] mb-2 lg:mt-0 mt-2 font-semibold text-[#000000]'>{footerItem.title}</h3>
                                        <ul class="">
                                            {footerItem.items.map((item, idx) => (
                                                <li key={idx} className='text-[1rem] lg:mb-3 mb-1 text-[#000000] font-semibold opacity-85 hover:scale-X-100 duration-200 ease-in-out'>
                                                    <Link to="/">{item.item}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            }

                        </div>

                    </div>
                </div>
                <hr />
                <div class="flex lg:flex-row flex-col justify-between items-center lg:gap-0 gap-2">

                    <div class="flex items-center">

                        <p class="mb-0">
                            © 2024, BookQuest All rights reserved
                        </p>

                    </div>

                    <div class="flex items-center justify-end">

                        <div class="flex items-center gap-4">

                            <h5 className='text-2xl text-[#333333]'>Follow Us</h5>


                            <ul class="flex gap-3">
                                <li class="p-3 rounded-full text-white bg-[#218659] hover:bg-[#525252]">
                                    <Link to="/">
                                        <FaFacebookF />
                                    </Link>
                                </li>
                                <li class="p-3 rounded-full text-white bg-[#218659] hover:bg-[#525252]">
                                    <Link to="/">
                                        <FaInstagram />
                                    </Link>
                                </li>
                                <li class="p-3 rounded-full text-white bg-[#218659] hover:bg-[#525252]">
                                    <Link to="/">
                                        <FaLinkedinIn />                                    </Link>
                                </li>
                                <li class="p-3 rounded-full text-white bg-[#218659] hover:bg-[#525252]">
                                    <Link to="/">
                                        <FaYoutube />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer