import React, { useEffect, useState } from "react"
import Hero from './Hero'
import Upcomming from "./Upcomming"
import Newsletter from './Newsletter';
import { groupCategory } from "../services/operations/bookcategory";

const HomePage = () => {

  
  const [categorybooks,setcategorybooks]=useState([])
  const [latestbooks,setlatestbooks]=useState([])
  const [mostSellingBooks,setmostSellingBooks]=useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("************resphere");
        const resp = await groupCategory();
        // console.log(resp);
        setcategorybooks(resp.data.availableBooks)
        setlatestbooks(resp.data.mostrecentbooks)
        setmostSellingBooks(resp.data.mostSellingBooks)
      } catch (error) {
        console.error(error); 
        console.log("ff2")
      }
    };
  
    fetchData();

  }, [])

  


  return (
    <div>
      <Hero />
      {
        console.log("available books",categorybooks)
      }
      <Upcomming books={categorybooks} title="Available Books" />
      <Upcomming books={latestbooks} title="New Arrival" />
      <Upcomming books={mostSellingBooks} title="Bestseller" />
      <Newsletter />
    </div>
  );
};
export default HomePage 
