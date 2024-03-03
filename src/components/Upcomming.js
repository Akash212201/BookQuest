import React from "react"
import BookCard from "./BookCard.js"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom"

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <button className='flex justify-center items-center absolute -top-14 -right-1 rounded border-[2px] w-[50px] h-[50px] border-[#ffffff4d] hover:border-white'>
        <FaLongArrowAltRight className="text-3xl text-black" />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <button className='flex justify-center items-center absolute -top-14 lg:left-[93%] left-[78%] rounded border-[2px] w-[50px] h-[50px] border-[#ffffff4d] hover:border-white z-10'>
        <FaLongArrowAltLeft className="text-3xl text-black"/>
      </button>
    </div>
  )
}
const Upcomming = ({ items, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className={`py-5 px-3 lg:px-10 ${title === 'New Arrival' ? 'bg-slate-300' : 'bg-slate-400'}`}>
      <div className='mb-5'>
      <div className='flex justify-between items-center px-3 mb-14'>
        <h1 className="font-medium text-3xl">{title}</h1>
        <Link to="/books" className="text-[#e50813] font-medium">View All</Link>
      </div>

      <div>
      <Slider {...settings}>
        {items.map((item) => {
          return (
            <Link to="/bookinfo" key={item.id}><BookCard item={item} /></Link>
          )
        })}
      </Slider>
      </div>

    </div>
    </div>
  )
}

export default Upcomming
