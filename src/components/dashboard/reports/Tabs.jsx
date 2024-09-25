import React, { useState } from 'react';
import UserReport from './UserReport';
import BookingSummaryReport from './Reports';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="container mx-auto mt-10 min-h-screen">
      <div className="flex justify-center flex-wrap max-sm:flex-col max-sm:w-[70%] max-sm:space-y-4 mb-4">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 mx-2 ${activeTab === 'bookings' ? 'bg-blue-500 dark:bg-blue-700 text-white' : 'bg-gray-300 dark:bg-gray-500'} rounded-2xl`}
        >
          Hostel Bookings
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 mx-2 ${activeTab === 'users' ? 'bg-blue-500 dark:bg-blue-700 text-white' : 'bg-gray-300 dark:bg-gray-500'} rounded-2xl`}
        >
          User Reports
        </button>
      </div>
      
      {activeTab === 'bookings' && <BookingSummaryReport />}
      {activeTab === 'users' && <UserReport />}
    </div>
  );
};

export default Tabs;
