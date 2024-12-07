import React from "react";
import Slider from "react-slick";

const HeroSlider = () => {
    const bannerImages = [
        "../images/home2.jpg",
        "../images/home2.jpg",
        "../images/home2.jpg",
        "../images/home2.jpg",
        "../images/home2.jpg",
        "../images/home2.jpg",
        "../images/home2.jpg",
    ]
    const settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 2500,
        cssEase: "linear",
        arrows: null,
        adaptiveHeight: true,
    };
    return (
        <div className="slider-container flex justify-center items-center flex-col py-2">
            <div className="w-[90%] pb-10 overflow-hidden lg:h-[400px] h-[120px] rounded-3xl">
                <Slider {...settings}>
                    {
                        bannerImages.map((image, idx) => (
                            <div key={idx} className="rounded-3xl w-full overflow-hidden h-full">
                                <img src={image} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))
                    }

                </Slider>
            </div>

        </div>
    );
}

export default HeroSlider;
