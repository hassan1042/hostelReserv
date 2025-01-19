import React from 'react';
import {  FaFootballBall, FaMosque, FaUtensils, FaWifi } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

function Amenities({hostel}) {

  const amenities = [
    {
      content: 'wifi',
      icon: <FaWifi  />,
    },
    {
      content: 'mess',
      icon: <IoFastFood />,
    },
    {
      content: 'mosque',
      icon: <FaMosque />,
    },
    {
      content: 'canteen',
      icon: <FaUtensils />,
    },
    {
      content: 'ground',
      icon: <FaFootballBall />,
    },
  ];

  return (
    <div className="border-y-neutral-300 border-y-[1px] py-5 text-xl max-lg:space-y-5 max-lg:mx-auto max-lg:my-3">
      <p className="text-2xl font-bold justify-start mb-5">Amenities</p>

      <div className="flex justify-between items-center flex-wrap">
        {
          amenities && amenities.map((amenity, i) => (
            <p key={i} className="flex justify-start items-center space-x-4 w-[28%] lg:w-[12%] mb-3"
              title={amenity.content} // Tooltip with content value
            >
              {amenity.icon} <span>
                  {hostel[amenity.content] === 'available' ? 'Yes' : 'No'}
             </span>
            </p>
          ))
        }
      </div>
    </div>
  );
}

export default Amenities;