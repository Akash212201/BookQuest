import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar'
import { categoryPage } from '../services/operations/bookcategory';

const Header = () => {
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
      name: 'Categories',
      path: '/:id',
      onClick: () => setIsCategoriesOpen(!isCategoriesOpen),
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


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/user/getCategories');
        setCategories(response.data.data);
        console.log("categories",response.data.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const renderCategories = () => {
    if (isCategoriesOpen) {
      return (
        <ul className="z-10 absolute top-full bg-green-500 text-white list-none w-[350px]">
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
    <div className='relative'>
      <div className="bg-green-500 text-white mobile">
        <ul className="flex justify-center items-center relative">
          {navLinks.map((link, idx) => (
            <li key={idx} className="lg:px-6 px-2 text-xl py-3">{}
              {link.onClick ? (
                <div>
                  <button onClick={link.onClick}>{link.name}</button>
                 
                  {renderCategories()}
                </div>
              ) : (
                <Link to={link.path}>{link.name}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden md:hidden cursor-pointer absolute -top-10 right-[2vw]" 
      onClick={() => setShowSidebar(!showSidebar)} >
        <div className='w-[30px] bg-black h-[5px] mb-1 naviline1'></div>
        <div className='w-[30px] bg-black h-[5px] mb-1 naviline2'></div>
        <div className='w-[30px] bg-black h-[5px] naviline3'></div>
      </div>
      {showSidebar && (
        <div className="z-10 absolute bg-white h-full w-full">
          <Sidebar hideSidebar={hideSidebar} navLinks={navLinks} renderCategories={renderCategories} />
        </div>
      )}
    </div>
  );
};

export default Header;

