import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <button className='flex justify-center items-center absolute top-1/2 right-1 rounded-[50%] border-[2px] w-[50px] h-[50px] border-black'>
        <FaLongArrowAltRight className="text-3xl" />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <button className='flex justify-center items-center absolute top-1/2 left-1 rounded-[50%] border-[2px] w-[50px] h-[50px] border-black z-10'>
        < FaLongArrowAltLeft className="text-3xl" />
      </button>
    </div>
  )
}

const Hero = () => {
  const homeData = [
    {
      id: 1,
      cover: "../images/home1.jpg",

    },
    {
      id: 2,
      cover: "../images/home2.jpg",
    },
    {
      id: 3,
      cover: "../images/home3.jpg",
    },
    {
      id: 4,
      cover: "../images/home4.jpg",
    },
  ]
  const settings = {
    infinite: true,
    fade: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <div className="bg-slate-400">
      <Slider {...settings}>
      {homeData.map((item) => {
        return (
          <div className="lg:h-[60vh] h-[20vh]" key={item.id}>
            <div className='coverImage absolute top-0 w-full lg:h-[60vh] h-[20vh]'>
              <img src={item.cover} alt='' className="w-full lg:h-full lg:object-cover object-contain" />
            </div>
          </div>
        )
      })}
    </Slider>
    </div>
  )
}

export default Hero
