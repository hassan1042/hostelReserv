import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { firestore } from '../../../firebase/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function HostelHistory() {
  const { currentUser } = useAuth();
  const [ hostels , setHostels] = useState([]);


    useEffect(() => {
        const fetchBookings = async () => {
          if (currentUser) {
            const bookingsRef = collection(firestore, 'bookings');
            const q = query(bookingsRef, where('ownerId', '==', currentUser.uid));
            const querySnapshot = await getDocs(q);
            const hostelsData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setHostels(hostelsData);
          }
        };
    
        fetchBookings();
      }, [currentUser]);
    
  return (
    <div className="container mx-auto my-10 min-h-screen dark:text-text">
    <h1 className="text-2xl font-bold mb-4">Your Hostels History</h1>
    {hostels.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {hostels.map((hostel) => (
      <div key={hostel.id} className="bg-white dark:bg-bgPrimaryDark shadow-lg rounded-lg p-6 border border-iconsDark">
        <h3 className="text-xl font-bold mb-3 italic text-center"> {hostel.name}</h3>

        {hostel.bookingDate ? (
          <div className="flex justify-between items-center text-gray-600 dark:text-gray-200 mb-2">
            <p>
              <span className="font-semibold">Start Date:</span>{' '}
              {new Date(hostel.bookingDate.seconds * 1000).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">End Date:</span>{' '}
              {new Date(hostel.endDate.seconds * 1000).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 mb-2">Booking Date: Not available</p>
        )}

        <p className="text-gray-600 dark:text-gray-300 font-bold capitalize text-center mt-5">
          <span >Status:</span>{' '}
          <span
            className={`px-2 py-1 rounded-lg ${
              hostel.status === 'accepted'
                ? 'bg-green-200 text-green-800'
                : hostel.status === 'rejected'
                ? 'bg-red-200 text-red-800'
                : 'bg-yellow-200 text-yellow-800'
            }`}
          >
            {hostel.status}
          </span>
        </p>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500">No hostels available</p>
)}

  </div>
  )
}

export default HostelHistory

