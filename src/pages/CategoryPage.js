import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Books from '../components/Books';
import { categoryPage, groupCategoryid } from '../services/operations/bookcategory';

const CategoryPage = () => {

    const location=useLocation();
    console.log("location",location)

    const categoryid=location.pathname.split("/").pop();
    console.log(categoryid)
    const [books,setbooks]=useState([])
    const [selectedOption, setSelectedOption] = useState('LowtoHigh'); // Initial selected value
const [sort,setsort]=useState(true)


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
        const resp = await groupCategoryid({categoryid});
            setbooks(resp.data.mostrecentbooks)

      // No need to set sort for Newest or Popular, handle in separate calls
      return;
    }
    else if(sortOption === "Popular"){
           const resp = await groupCategoryid({categoryid});
    setbooks(resp.data.mostSellingBooks)
        return ;
    }

    try {
      const resp = await categoryPage({ categoryid, sort: apiSort });
      console.log("resp", resp.data.eBooks);
      setbooks(resp.data.eBooks);
    } catch (error) {
      console.error(error);
    }
  };
  
   
    useEffect(() => {
      const fetchData = async () => {
        try {
            console.log(categoryid)
          const resp = await categoryPage({categoryid,sort});
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

export default  CategoryPage