import React from 'react'

function TopSection({hostel, handleChange}) {
  return (
    <div className="flex flex-wrap justify-between items-center">
    <div className="w-[90%] max-md:mx-auto md:w-[30%]">
      <label className="block text-gray-700 dark:text-neutral-200">
        Hostel Name
      </label>
      <input
        type="text"
        name="name"
        value={hostel.name}
        onChange={handleChange}
        className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1 lowecase"
      />
    </div>
    <div className="w-[90%] max-md:mx-auto lg:w-[60%] flex justify-between items-center flex-wrap">
      <div className="max-sm:w-[100%] w-[80%]">
        <label className="block text-gray-700 dark:text-neutral-200">
          Address
        </label>
        <input
          type="text"
          name="location"
          value={hostel.location}
          onChange={handleChange}
          className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
        />
      </div>
      <div className="max-sm:w-[100%] w-[15%]">
        <label className="block text-gray-700 dark:text-neutral-200">
          Room Number
        </label>
        <input
          type="number"
          name="roomNumber"
          value={hostel.roomNumber}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 2) {
              handleChange(e);
            }
          }}
          className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
          min="0"
          max="99"
        />
      </div>
    </div>
  </div>
  )
}

export default TopSection
