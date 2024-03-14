import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

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
  }
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
      {homeData.map((item) => {
        return (
          <div className="lg:h-[60vh] h-[15vh]" key={item.id}>
            <div className='coverImage w-full lg:h-[62vh] h-[20vh]'>
              <img src={item.cover} alt='' className="w-full lg:h-full lg:object-cover object-cover" />
            </div>
          </div>
        )
      })}
    </Slider>
    </div>
  )
}

export default Hero
