import React, { useEffect, useState } from 'react'
import Books from '../components/Books'
import { useLocation } from 'react-router-dom'
import { groupCategory } from '../services/operations/bookcategory';

const BooksPage = () => {

    const location=useLocation();
    console.log("location",location)

    const searchparams=location.pathname.split("/").pop();
    console.log(searchparams)
    const [books,setbooks]=useState([])
   
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const resp = await groupCategory();
          console.log("resp", resp.data);
          if(location.pathname==="/newarrival")
          setbooks(resp.data.mostrecentbooks)
           else
        setbooks(resp.data.mostSellingBooks)
  
         
        } catch (error) {
          console.error(error); // Use console.error for errors
        }
      };
    
      fetchData();
  
    }, [location.pathname]) // change depends upon location.pathname

    console.log("books",books)
    return (
        <div className="border border-black bookPage">
        <div className='relative h-12'>
            <div className='absolute top-0 right-0 bg-slate-300 p-2 font-bold rounded-b-lg'>
                Sort By:
                <select name="" id="" className='ml-2 bg-slate-300 outline-none'>
                    <option value="">Low to High</option>
                    <option value="">High to Low</option>
                    <option value="">Popular</option>
                    <option value="">Newest</option>
                </select>
            </div>
        </div>
        <div className="flex">
            <div className=" w-[20%] bg-red-500 mobile">
              
            </div>
            <div className="lg:w-[80%] w-[100%] relative py-4 px-2">
                <Books books={books} />
            </div>
        </div>
    </div>

    )
}

export default BooksPage