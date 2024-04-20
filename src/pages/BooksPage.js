import React, { useEffect, useState } from 'react'
import Books from '../components/Books'
import { useLocation } from 'react-router-dom'
import { groupCategory, groupCategorysort } from '../services/operations/bookcategory';

const BooksPage = () => {

    const location=useLocation();
    console.log("location",location)

    const searchparams=location.pathname.split("/").pop();
    console.log(searchparams)
    const [books,setbooks]=useState([])
    const [selectedOption, setSelectedOption] = useState('LowtoHigh'); // Initial selected value

   
   
    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
      console.log(selectedOption);
      fetchBooks(event.target.value);
    };
  
    const fetchBooks = async (sortOption) => {
      let apiSort = true;
      if (sortOption === "LowtoHigh") {
        apiSort = true;
      } else if (sortOption === "HightoLow") {
        apiSort = false;
      } else if (sortOption === "Newest" ) {
          const resp = await groupCategory();
        setbooks(resp.data.mostrecentbooks)
  
        // No need to set sort for Newest or Popular, handle in separate calls
        return;
      }
      else if(sortOption === "Popular"){
        const resp = await groupCategory(); 
  setbooks(resp.data.mostSellingBooks)
          return ;
      }
  
      try {
        const resp = await groupCategorysort({ sort: apiSort });
        
        console.log("resp.data",resp.data)
        if(location.pathname==="/newarrival")
        setbooks(resp.data.mostrecentbooks)
      else{
        setbooks(resp.data.mostSellingBooks)
      }
      } catch (error) {
        console.error(error);
      }
    };

    

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
                <select
                name=""
                id=""
                className="ml-2 bg-slate-300 outline-none" // Use correct class names
                value={selectedOption} // Set selected value from state
                onChange={handleOptionChange} // Handle option changes
              >
                <option value="LowtoHigh">Low to High</option>
                <option value="HightoLow">High to Low</option>
                <option value="Popular">Popular</option>
                <option value="Newest">Newest</option>
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