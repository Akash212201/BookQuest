import React from "react"
import { Link } from "react-router-dom"
import BookCard from "./BookCard.js"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <button className='flex justify-center items-center absolute -top-14 -right-1 rounded border-[2px] w-[40px] h-[40px] border-[#000]'>
        <FaLongArrowAltRight className="text-3xl text-black" />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <button className='flex justify-center items-center absolute -top-14 lg:left-[94%] left-[78%] rounded border-[2px] w-[40px] h-[40px] border-[#000]'>
        <FaLongArrowAltLeft className="text-3xl text-black"/>
      </button>
    </div>
  )
}
const Upcomming = ({ books, title }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1
        }
      }
    ],
  }
  return (
    <div className={'py-5 px-3 lg:px-10'}>
      <div className='mb-5'>
      <div className='flex justify-between items-center px-3 mb-14'>
        <h1 className="font-medium text-3xl">{title}</h1>
        <Link to="/books" className="text-[#e50813] font-medium">View All</Link>
      </div>

      <div> 
      <Slider {...settings}>
        {books.map((book) => {
          return (
          <div key={book.id} className="px-4"> <BookCard book = {book} /> </div>
          )
        })}
      </Slider>
      </div>

    </div>
    </div>
  )
}

export default Upcomming
