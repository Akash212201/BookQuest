import React, { useEffect, useState } from 'react'
import { LuShoppingBag } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import Upcomming from './Upcomming';
import { useLocation } from 'react-router-dom';
import { showbookdetails } from '../services/operations/bookcategory';
const BookInfo = () => {
    const [book,setbook]=useState({});
    const location=useLocation();
    const id=location.pathname.split("/").pop();
    console.log("id",id)

  
   
        const fetchData = async () => {
          let response = await showbookdetails(id);
          setbook(response.data);
        };
    
   useEffect(() => {
   
       fetchData();
   }, [location.pathname])
     
    

    console.log("bookdetails",book)
    return (
       <>
        <div className='py-10 px-7 lg:px-[10vw] flex lg:flex-row flex-col gap-4'>
            <div className='lg:w-[30%] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-full h-[450px] px-2 py-4'>
                <img src={book.thumbnail} alt="" className="w-full h-[420px] object-contain" />
            </div>
            <div className='lg:w-2/3 w-full'>
                <div className='px-5 pt-3 font-medium'>
                    <h2 className='text-2xl'>{book.bookName}</h2>
                    <p className='my-3'>  <b>Author: </b> {book.bookAuthor}</p>
                    <p className="text-red-500 text-2xl my-4">{book.price}</p>
                    <p><b>Availablity: </b>{book.bookStock}</p>

                    <div className="my-10 flex items-center lg:text-xl">
                        <button className='flex items-center border px-3 py-2 text-white bg-red-500 cursor-pointer hover:bg-red-600 transition mr-5'><MdOutlineShoppingCart className="mr-2" />Buy Now</button>
                        <button className='flex items-center border px-3 py-2 text-white bg-red-500 cursor-pointer hover:bg-red-600 transition'><LuShoppingBag className="mr-2" />Add to Cart</button>
                    </div>
                    <div className='flex lg:gap-16 lg:flex-row flex-col'>
                        <div className=''>
                            <h3 className='text-2xl font-light'>Rating and Reviews</h3>
                            <p className='text-2xl mt-1 mb-5'><b>5.0/5</b></p>
                            <div className='flex gap-2 text-white mb-5'>
                                {
                                    [0, 1, 2, 3, 4].map((text, idx) => (

                                        <IoIosStar key={idx} className="p-1 text-3xl bg-red-400 rounded hover:bg-red-600 transition-all" />
                                    ))
                                }

                            </div>
                        </div>
                        <div className='mt-1'>
                            {
                                [4,3,2,1,0].map((text, idx) => (

                                    <div key={idx} className='flex items-center'>{text+1}<IoIosStar /><span className='border h-3 lg:w-[10vw] w-[30vw] rounded-md mx-2 bg-red-200'></span>0</div>
                                ))
                            }
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div>
        
        </div>
       </>
    )
}

export default BookInfo