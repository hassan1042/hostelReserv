import React from 'react'
import { FaBath, FaBed, FaPhoneAlt } from 'react-icons/fa'
import AddToFavorites from '../dashboard/favorites/AddFavorites'

function InitialInfo({selectedHostel}) {
  return (
    <div className=''>
         <div className="text-xl md:text-2xl lg:text-2xl font-bold flex justify-around items-center capitalize flex-wrap max-sm:space-y-3">
        <p className=" ">
          {selectedHostel.name} at {selectedHostel.location}
        </p>
        <a
          className="flex justify-between items-center text-lg space-x-3"
          href={`tel:${selectedHostel.contact}`}
        >
          <FaPhoneAlt />
          <span
          title="Contact"
          >{selectedHostel.contact}</span>
        </a>
        <AddToFavorites id={selectedHostel.id} />
      </div>
      <div className="flex justify-evenly items-center flex-wrap py-5 max-sm:justify-center max-sm:w-full max-sm:space-x-4">
        <div
          title="Beds"
          className="flex justify-center items-center space-x-4"
        >
          <FaBed />
          <p>{selectedHostel.beds}</p>
        </div>

        <div
          title="Bathroom"
          className="flex justify-center items-center space-x-4"
        >
          <FaBath />
          <p>{selectedHostel.bathroom}</p>
        </div>
      </div>

      <div className="flex justify-evenly items-center flex-wrap">
        <div className="flex flex-col justify-center    my-5 italic text-xl">
          <p className=" font-bold text-xl lg:text-2xl my-3 text-center">
            {" "}
            Hostel Description
          </p>
          <p className=" font-semibold"> {selectedHostel.description}</p>
        </div>
        <a
          href={selectedHostel.video}
          rel="noopener noreferrer"
          className="text-xl text-white italic"
        >
          Watch a video
        </a>
      </div>

      {/** booking and instructions */}
      <div className="flex flex-wrap justify-between items-center my-5">
        <div className="flex flex-col justify-center mx-auto text-center   my-5 italic text-xl">
          <p className=" font-bold text-xl lg:text-2xl my-3">
            {" "}
            Booking Information
          </p>
          <p className=" font-semibold"> {selectedHostel.booking}</p>
        </div>
        <div className="flex flex-col justify-center mx-auto text-center   my-5 italic text-xl lg:w-[40%]">
          <p className=" font-bold text-xl lg:text-2xl my-3">
            {" "}
            Special Instructions
          </p>
          <p className=" font-semibold text-red-400">
            {" "}
            {selectedHostel.instruction}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InitialInfo
