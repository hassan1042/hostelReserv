import React from 'react';

function BottomSection({hostel, handleChange, handleFileChange}) {
  return (
    <div>
      
      <div className="flex flex-wrap justify-between items-center">
            <div className="max-md:w-[90%] max-md:mx-auto my-3">
              <label className="block text-gray-700 dark:text-neutral-200">
                Upload Images
              </label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
              />
            </div>
            <div className="max-md:w-[90%] max-md:mx-auto my-3">
              <label className="block text-gray-700 dark:text-neutral-200">
                Upload Video
              </label>
              <input
                type="file"
                name="video"
                onChange={handleFileChange}
                className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
              />
            </div>
            <div className="max-md:w-[90%] max-md:mx-auto my-3">
              <label className="block text-gray-700 dark:text-neutral-200">
              Contact
              </label>
              <input
                type="number"
                name="contact"
                value={hostel.contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 11) {
                    handleChange(e);
                  }
                }}
                className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
              />
            </div>
            <div className="max-md:w-[90%] max-md:mx-auto my-3">
              <label className="block text-gray-700 dark:text-neutral-200">
              Payment Info
              </label>
              <input
                type="text"
                name="payment"
                value={hostel.payment}
                placeholder="Easypaisa: number"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 25) {
                    handleChange(e);
                  }
                }}
                className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
              />
            </div>
          </div>

          <div className="max-md:w-[90%] max-md:mx-auto my-3">
            <label className="block text-gray-700 dark:text-neutral-200">
              Booking Information
            </label>
            <input
              type="text"
              name="booking"
              value={hostel.booking}
              onChange={handleChange}
              className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            />
          </div>
          <div className="max-md:w-[90%] max-md:mx-auto my-3">
            <label className="block text-gray-700 dark:text-neutral-200">
              Special Instructions
            </label>
            <input
              type="text"
              name="instruction"
              value={hostel.instruction}
              onChange={handleChange}
              className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            />
          </div>
    </div>
  )
}

export default BottomSection
