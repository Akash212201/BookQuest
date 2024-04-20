import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Books from '../components/Books';
import { categoryPage } from '../services/operations/bookcategory';

const CategoryPage = () => {

    const location=useLocation();
    console.log("location",location)

    const categoryid=location.pathname.split("/").pop();
    console.log(categoryid)
    const [books,setbooks]=useState([])
   
   
    useEffect(() => {
      const fetchData = async () => {
        try {
            console.log(categoryid)
          const resp = await categoryPage({categoryid});
          console.log("resp", resp.data.eBooks);
         setbooks(resp.data.eBooks)
  
         
        } catch (error) {
          console.error(error); 
        }
      };
    
      fetchData();
  
    }, [location.pathname]) // change depends upon location.pathname

  
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

export default  CategoryPage