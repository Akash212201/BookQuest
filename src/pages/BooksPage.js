import React, { useEffect, useState } from 'react'
import Books from '../components/Books'
import { useLocation } from 'react-router-dom'
import { groupCategory, groupCategorysort } from '../services/operations/bookcategory';

const BooksPage = () => {

  const location = useLocation();


  const [books, setbooks] = useState([])
  const [selectedOption, setSelectedOption] = useState('LowtoHigh');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    fetchBooks(event.target.value);
  };

  const fetchBooks = async (sortOption) => {
    let apiSort = true;
    if (sortOption === "LowtoHigh") {
      apiSort = true;
    } else if (sortOption === "HightoLow") {
      apiSort = false;
    } else if (sortOption === "Newest") {
      const resp = await groupCategory();
      setbooks(resp.data.mostrecentbooks)
      return;
    }
    else if (sortOption === "Popular") {
      const resp = await groupCategory();
      setbooks(resp.data.mostSellingBooks)
      return;
    }

    try {
      const resp = await groupCategorysort({ sort: apiSort });
      if (location.pathname === "/newarrival")
        setbooks(resp.data.mostrecentbooks)
      else {
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
        if (location.pathname === "/newarrival")
          setbooks(resp.data.mostrecentbooks)
        else
          setbooks(resp.data.mostSellingBooks)


      } catch (error) {
        console.error(error); // Use console.error for errors
      }
    };

    fetchData();

  }, [location.pathname])
  return (
    <div className="bookPage">
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
      <div className="w-[100%] relative py-4 px-[1.5rem] md:px-[2rem] lg::px-[3.5rem]">
        <Books books={books} />
      </div>

    </div>

  )
}

export default BooksPage