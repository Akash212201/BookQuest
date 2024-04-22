import React, { useEffect, useState } from "react"
import Hero from '../components/Hero'
import Upcomming from "../components/Upcomming"
import Newsletter from '../components/Newsletter';
import { groupCategory } from "../services/operations/bookcategory";

const HomePage = () => {

  
  const [categorybooks,setcategorybooks]=useState([])
  const [latestbooks,setlatestbooks]=useState([])
  const [mostSellingBooks,setmostSellingBooks]=useState([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await groupCategory();
        console.log("resp1", resp.data);

        setcategorybooks(resp.data.availableBooks)
        setlatestbooks(resp.data.mostrecentbooks)
        setmostSellingBooks(resp.data.mostSellingBooks)
      } catch (error) {
        console.error(error); 
      }
    };
  
    fetchData();

  }, [])



  return (
    <div>
      <Hero />
      <Upcomming books={categorybooks} url={"availablebooks"} title="Available Books" />
      <Upcomming books={latestbooks} url={"newarrival"} title="New Arrival" />
      <Upcomming books={mostSellingBooks} url={"bestseller"} title="Bestseller" />
      <Newsletter />
    </div>
  );
};
export default HomePage 
