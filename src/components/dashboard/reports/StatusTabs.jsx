import React from 'react'

function StatusTabs({selectedTab , setSelectedTab, bookings, setTabBookings}) {
    const handleStatusTab = (tabValue) => {
        const tab = tabValue.toLowerCase();
        setSelectedTab(tab);
    
        if (tab === "all") {
          setTabBookings(bookings); // Reset to show all bookings
        } else {
          const filteredBookings = bookings.filter(
            (booking) => booking.status === tab
          );
          setTabBookings(filteredBookings);
        }
      };
  return (
    <div  className="flex space-x-4 mb-4 flex-wrap space-y-4">
         {["all", "pending", "accepted", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleStatusTab(tab)}
            className={`px-4 py-2 rounded-md ${
              selectedTab === tab
                ? "bg-blue-500 dark:bg-blue-900 text-white"
                : "bg-gray-300 dark:bg-bgPrimaryDark hover:bg-gray-900 hover:text-white"
            }  capitalize transition-all duration-150`}
          >
            {tab}
          </button>
        ))}
    </div>
  )
}

export default StatusTabs
