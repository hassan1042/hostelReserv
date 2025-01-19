import React from 'react'

function Amenities({amenities, hostel, handleChange}) {
  return (
    <div className="flex flex-wrap justify-between items-center dark:text-text space-x-4 space-y-2">
    {amenities.map((amenity) => (
      <div className="max-md:w-[90%] max-md:mx-auto">
        <label className="block text-gray-700 dark:text-neutral-200">
          {amenity.content}
        </label>

        <div className="flex space-x-4 ">
          <label>
            <input
              type="radio"
              name={amenity.content}
              value="available"
              checked={hostel[amenity.content] === "available"}
              onChange={handleChange}
              className="mr-2 "
            />
            Available
          </label>
          <label>
            <input
              type="radio"
              name={amenity.content}
              value="unavailable"
              checked={hostel[amenity.content] === "unavailable"}
              onChange={handleChange}
              className="mr-2"
            />
            Un-Available
          </label>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Amenities
