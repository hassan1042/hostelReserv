import React from 'react'
import { FaBath, FaBed, FaMapMarkerAlt } from 'react-icons/fa';
import { useHostel } from '../../contexts/HostelContext';
import { useNavigate } from 'react-router-dom';

function CardSliderless({hostels}) {
    const { selectHostel } = useHostel();
    const navigate = useNavigate();
      // Slick Slider Settings
const handleCardClick = (hostel) => {
    selectHostel(hostel);
    navigate('/hostel-details');
  };
  return (
 <>
       {hostels.map((hostel) => (
        <div key={hostel.id} className="px-2 hover:-translate-y-[10px] transition-all duration-200 mb-3">
          <div className="border rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={() => handleCardClick(hostel)}>
            {hostel.images && (
              <img src={hostel.images[0]} alt={hostel.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
            <div className='flex justify-between items-center w-full '>
            <h3 className="text-xl font-semibold">{hostel.name}</h3>
            <h2 className="text-xl font-normal">Rs:{hostel.price}</h2>
  
            </div>
            <p className='text-gray-600 dark:text-gray-200 my-3 text-justify italic h-16 overflow-hidden'>{hostel.description}</p>
            {/** loc Bath Bed */}
          <div className='flex justify-between items-center flex-wrap my-5 text-gray-600 dark:text-gray-200 '>
          <p className="flex justify-start items-center space-x-2">
              <i><FaMapMarkerAlt/> </i>   <span>{hostel.location}</span>
              </p>
              <p className=" flex justify-start items-center space-x-2">
              <i><FaBed/> </i>   <span>{hostel.beds}</span>
              </p>
              <p className=" flex justify-start items-center space-x-2">
              <i><FaBath/></i>    <span>{hostel.bathroom}</span>
              </p>
          </div>
          <p className='text-red-300 my-3 text-justify font-thin h-8'>Note : {hostel.instruction}</p>
  
            </div>
          </div>
        </div>
      ))}
 </>
  )
}

export default CardSliderless
