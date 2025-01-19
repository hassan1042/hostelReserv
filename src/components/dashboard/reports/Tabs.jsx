import React, { useState } from 'react';
import UserReport from './UserReport';
import BookingSummaryReport from './Reports';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Hostel Bookings');
  const tabs = [
    {
      content : 'Hostel Bookings', 
    },
    {
      content : 'User Reports', 
    },
  ]

  return (
    <div className="container mx-auto mt-1 min-h-screen">
      <div className="flex justify-center flex-wrap max-sm:flex-col max-sm:w-[70%] max-sm:mx-auto max-sm:space-y-4 mb-4">
      {
        tabs.map((cont) => (
          <button
          onClick={() => setActiveTab(cont.content)}
          className={`max-sm:px-1 max-sm:py-1 max-sm:text-lg px-4  py-2 mx-2 transition-all duration-150 hover:bg-blue-700 hover:text-white ${activeTab === cont.content ? 'bg-blue-500 dark:bg-blue-900 text-white' : 'bg-gray-300 dark:bg-gray-500'} rounded-2xl`}
        >
          {cont.content}
        </button>
        ))
      }
      </div>
      
      {activeTab === 'Hostel Bookings' && <BookingSummaryReport />}
      {activeTab === 'User Reports' && <UserReport />}
    </div>
  );
};

export default Tabs;
