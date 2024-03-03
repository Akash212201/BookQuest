import React from "react"
import { Link } from "react-router-dom";
import { LuShoppingBag } from "react-icons/lu";
const BookCard = ({ item: { id, cover, name, author, price } }) => {
  
  return (
    <div className="rounded-2xl overflow-hidden w-[160px] lg:w-[220px] cursor-pointer">
      <Link to="/bookinfo">
      <div className="border-[2px] overflow-hidden">
        <div className="h-[140px] lg:h-[200px] bg-white">
          <img src={cover} alt='' className="mx-auto h-full" />
        </div>
        <div className="bg-white">
          <div className="h-[115px] lg:px-5 px-3 lg:py-3 py-1">
            <h3 className="lg:text-xl text-lg leading-5 font-medium">{name}</h3>
            <span className="text-sm lg:text-xs leading-3">{author}</span>
            <p className="text-lg text-red-500 font-bold">₹{price}/-</p> 
          </div> 
        </div>
      </div>
      </Link>
          <div className="bg-black text-white w-full flex justify-evenly items-center px-1 lg:px-10 py-3">
            <LuShoppingBag className="text-xl" />Add to cart
          </div>
    </div>

  ) 
}

export default BookCard