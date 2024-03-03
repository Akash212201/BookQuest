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
      <button className='flex justify-center items-center absolute top-[40%] right-1 rounded-[50%] border-[2px] lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] border-white'>
        <FaLongArrowAltRight className="lg:text-3xl text-2xl text-white" />
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className="cursor-pointer" onClick={onClick}>
      <button className='flex justify-center items-center absolute top-[40%] left-1 rounded-[50%] border-[2px] lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] border-white z-10'>
        < FaLongArrowAltLeft className="lg:text-3xl text-2xl text-white" />
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
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <div className="lg:h-[55vh] h-[14vh]">
      <Slider {...settings}>
        {
          homeData.map((item) => {
            return (
              <div className="lg:h-[55vh] h-[14vh]" key={item.id}>
                <div className='coverImage absolute top-0 w-full lg:h-[55vh] h-[14.6vh]'>
                  <img src={item.cover} alt='' className="w-full lg:h-full object-cover h-full" />
                </div>
              </div>
            )
          })
        }
      </Slider>
    </div>
  )
}

export default Hero
