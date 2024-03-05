import React from "react"
import { LuShoppingBag } from "react-icons/lu";
const BookCard = ({ item: { id, cover, name, author, price } }) => {
  return (
    <div className="rounded-2xl overflow-hidden w-[220px] cursor-pointer">
      <div className="border">
        <div className="h-[200px] bg-white">
          <img src={cover} alt='' className="mx-auto h-full" />
        </div>
        <div className="bg-white">
          <div className="h-[110px] px-5 py-3">
            <h3 className="text-xl leading-6 font-medium">{name}</h3>
            <span className="text-sm">{author}</span> <br />
            <p className="text-lg text-[#e50813] font-bold">₹ {price}/-</p>
          </div>
          <div className="bg-black text-white w-full flex justify-evenly items-center px-10 py-3">
            <LuShoppingBag className="text-xl" />Add to cart
          </div>
        </div>
      </div>
    </div>

  )
}

export default BookCard