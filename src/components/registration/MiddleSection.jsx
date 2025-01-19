import React from 'react'

function MiddleSection({hostel, handleChange}) {
  return (
    <div>
       <div className="flex flex-wrap justify-between items-center dark:text-text  ">
            <div className="max-md:flex max-md:items-center max-md:w-[90%] max-md:mx-auto">
              <label className="block text-gray-700 max-md:w-[30%] dark:text-neutral-200 ">
                <span className="max-md:hidden">Number</span>{" "}
                <span className="md:hidden">No</span> of Beds
              </label>
              <input
                type="number"
                name="beds"
                value={hostel.beds}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 1) {
                    handleChange(e);
                  }
                }}
                className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1 max-md:w-[65%]"
                maxLength={11}
              />
            </div>

            <div className="max-md:flex max-md:items-center max-md:w-[90%] max-md:mx-auto">
              <label className="block text-gray-700 max-md:text-sm max-md:w-[40%] dark:text-neutral-200">
                Price per Day
              </label>
              <input
                type="number"
                name="price"
                value={hostel.price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 4) {
                    handleChange(e);
                  }
                }}
                className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1 max-md:w-[60%]"
              />
            </div>
          </div>
          <div className="max-md:w-[90%] max-md:mx-auto">
            <label className="block text-gray-700 dark:text-neutral-200">
              Description
            </label>
            <textarea
              name="description"
              value={hostel.description}
              onChange={handleChange}
              className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            />
          </div>
    </div>
  )
}

export default MiddleSection
