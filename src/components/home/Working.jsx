import React from 'react';

function Working() {
  return (
    <section 
     data-aos="fade-down"
     data-aos-duration="3000"
    className="my-10 text-center container mx-auto px-2">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="bg-blue-100 p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-2 text-yellow-600">Search</h3>
          <p className="text-gray-700">Find hostels that meet your needs by filtering by location, amenities, and more.</p>
        </div>
        <div className="bg-green-100 p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-2 text-fuchsia-600">Book</h3>
          <p className="text-gray-700">Easily book your selected hostel with just a few clicks, and receive instant confirmation.</p>
        </div>
        <div className="bg-yellow-100 p-8 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold mb-2 text-pink-900">Stay</h3>
          <p className="text-gray-700">Enjoy your stay with us, and make the most of your trip with our top-rated hostels.</p>
        </div>
      </div>
    </section>
  );
}

export default Working;
