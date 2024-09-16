import React from 'react';

function ReportsTable({tabBookings, selectedTab}) {
  return (
    <div>
      {tabBookings.length > 0 && (
  <div className="mt-6">
    <h2 className="text-2xl font-bold mb-4">Booking Report ({selectedTab})</h2>
    <p className="text-lg mb-4">Total Bookings: {tabBookings.length}</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tabBookings.map((booking) => (
        <div key={booking.id} className="bg-text dark:bg-cardDark shadow-md rounded-lg p-4 border border-icons">
          <h3 className="text-lg font-semibold mb-3 italic text-center text-slate-700 dark:text-text">{booking.name}</h3>
          <div className='flex justify-between items-center my-3 font-bold capitalize'>
          <p className="text-gray-600 dark:text-gray-200">
            <span >User:</span> {booking.userName}
          </p>
          <p className="text-gray-600 dark:text-gray-200">
            <span className="font-semibold">Status:</span> <span className={`px-2 py-1 rounded-lg ${booking.status === 'accepted' ? 'bg-green-200 text-green-800' : booking.status === 'rejected' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>{booking.status}</span>
          </p>
          </div>
          <p className="text-gray-600 dark:text-gray-200">
            <span className="font-semibold">Booking Date:</span> {new Date(booking.bookingDate.seconds * 1000).toLocaleDateString()}
          </p>
         
        </div>
      ))}
    </div>
  </div>
)}
    </div>
  )
}

export default ReportsTable
