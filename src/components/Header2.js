import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'
import { TbCategory } from "react-icons/tb";

const Header2 = () => {
    const [categories, setCategories] = useState([]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    const hideSidebar = () => {
        setShowSidebar(false);
        setIsCategoriesOpen(false);
    };

    const navLinks = [
        {
            name: 'Home',
            path: '/',
        },

        {
            name: 'New Arrival',
            path: '/newarrival',
        },
        {
            name: 'Best Seller',
            path: '/bestseller',
        },
        {
            name: 'Request a Book',
            path: '/requestbook',
        },
    ];

    const mobileNavLinks = [
        ...navLinks,
        {
            name: 'Categories',
            path: '/:id',
            onClick: ()=>setIsCategoriesOpen(!isCategoriesOpen),
        },
    ];
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://bookquest.onrender.com/api/v1/user/getCategories');
                setCategories(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    const renderCategories = () => {
       
        if (isCategoriesOpen) {
            return (
                <ul className="z-10 absolute top-full bg-green-500 text-white list-none w-[350px] lg:left-8 left-4 lg:opacity-90 opacity-75">
                    {categories.map((category, index) => (
                        <li key={index} className="py-2 px-4 hover:bg-green-700" >
                            <Link
                                to={`/${category._id}`}
                                onClick={() => {
                                    setIsCategoriesOpen(false);
                                    setShowSidebar(false);
                                }}
                            >
                                {category.categoryName}
                            </Link>
                        </li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <div className='relative mb-4'>
            <div className="text-[#35faa1] mobile flex justify-start items-center gap-4 border-b-2 border-t-2">
                <div className='flex justify-start items-center gap-2 text-xl w-[30%] lg:px-8 px-2 py-3'>
                    <TbCategory />
                    <button onClick={()=>setIsCategoriesOpen(!isCategoriesOpen)}>Categories</button>
                    <div>{renderCategories()}</div>
                </div>
                <div className=''>
                    <ul className="flex justify-center items-center relative">
                        {
                            navLinks.map((link, idx) => (
                                <li key={idx} className="lg:px-6 px-2 text-xl py-3">{ }
                                    <Link to={link.path}>{link.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>


            </div>
            <div className="lg:hidden md:hidden cursor-pointer absolute -top-10 right-[2vw]"
                onClick={() => setShowSidebar(!showSidebar)} >
                <div className='w-[30px] bg-black h-[5px] mb-1 naviline1'></div>
                <div className='w-[30px] bg-black h-[5px] mb-1 naviline2'></div>
                <div className='w-[30px] bg-black h-[5px] naviline3'></div>
            </div>
            {
                
            showSidebar && (
                <div className="z-10 absolute bg-white h-full w-full">
                    <Sidebar hideSidebar={hideSidebar} navLinks={mobileNavLinks} renderCategories={renderCategories} />
                </div>
            )}
        </div>
    );
};

export default Header2;

