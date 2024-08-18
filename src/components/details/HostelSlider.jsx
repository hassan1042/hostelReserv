import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    dots: false,
    navigation: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="w-full md:w-[90%] mx-auto h-96 ">
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Hostel  ${index + 1}`} className="w-full h-96 object-cover" />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
