import React from 'react';
import Slider from 'react-slick';
import { useHostel } from '../../contexts/HostelContext';
import { useNavigate } from 'react-router-dom';
import { FaBath, FaBed,  FaMapMarkerAlt } from 'react-icons/fa';


function Card({hostels}) {

    const { selectHostel } = useHostel();
    const navigate = useNavigate();
      // Slick Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  const handleCardClick = (hostel) => {
    selectHostel(hostel);
    navigate('/hostel-details');
  };
  return (
    <Slider {...settings}>
    {hostels.map((hostel) => (
      <div key={hostel.id} className="px-2 hover:-translate-y-[10px] transition-all duration-200 ">
        <div className="border rounded-lg shadow-lg overflow-hidden cursor-pointer  dark:bg-cardDark" onClick={() => handleCardClick(hostel)}>
          {hostel.images && (
            <img src={hostel.images[0]} alt={hostel.name} className="w-full h-48 object-cover" />
          )}
          <div className="p-4">
          <div className='flex justify-between items-center w-full '>
          <h3 className="text-xl font-semibold text-textDark dark:text-text">{hostel.name}</h3>
          <h2 className="text-xl font-normal text-textDark dark:text-text">Rs:{hostel.price}</h2>

          </div>
          <p className='text-gray-600 dark:text-gray-200 my-3 text-justify italic h-16 overflow-hidden'>{hostel.description}</p>
          {/** loc Bath Bed */}
        <div className='flex justify-between items-center flex-wrap my-5 text-gray-600 '>
        <p className="flex justify-start items-center space-x-2">
            <i className='text-icons dark:text-iconsDark'><FaMapMarkerAlt/> </i>   <span className=' text-textDark dark:text-text'>{hostel.location}</span>
            </p>
            <p className=" flex justify-start items-center space-x-2">
            <i className='text-icons dark:text-iconsDark'><FaBed/> </i>   <span className=' text-textDark dark:text-text'>{hostel.beds}</span>
            </p>
            <p className=" flex justify-start items-center space-x-2">
            <i className='text-icons dark:text-iconsDark'><FaBath/></i>    <span className=' text-textDark dark:text-text'>{hostel.bathroom}</span>
            </p>
        </div>
        <p className='text-red-300 my-3 text-justify font-thin h-8'>Note : {hostel.instruction}</p>

          </div>
        </div>
      </div>
    ))}
  </Slider>
  )
}

export default Card
