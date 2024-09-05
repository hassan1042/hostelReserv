import React from 'react';

function Categories() {
  return (
    <section
     data-aos="fade-up"
     data-aos-duration="3000"
     className="my-12 text-left  container mx-auto px-2">
      <h2 className="text-3xl font-bold mb-6 text-center  text-textDark dark:text-text">Explore by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-cardDark p-8 rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-blue-500 transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Budget</h3>
          <p className="text-gray-600 dark:text-gray-200">Find affordable hostels that fit your budget without compromising on quality.</p>
        </div>
        <div className="bg-white dark:bg-cardDark p-8 rounded-lg shadow-md hover:bg-green-50 dark:hover:bg-green-500 transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-2 text-green-600">Luxury</h3>
          <p className="text-gray-600 dark:text-gray-200">Discover luxurious hostels with premium amenities and services.</p>
        </div>
        <div className="bg-white dark:bg-cardDark p-8 rounded-lg shadow-md hover:bg-yellow-50 dark:hover:bg-yellow-500 transition-colors duration-300">
          <h3 className="text-xl font-semibold mb-2 text-yellow-600">Location</h3>
          <p className="text-gray-600 dark:text-gray-200">Explore hostels in prime locations that put you close to attractions and conveniences.</p>
        </div>
        {/* Add more categories as needed */}
      </div>
    </section>
  );
}

export default Categories;
