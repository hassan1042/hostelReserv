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
    <div className="container mx-auto my-10 min-h-screen">
    <h1 className="text-2xl font-bold mb-4">Your Hostels History</h1>
    {hostels.length > 0 ? (
      <ul className="space-y-4">
        {hostels.map((hostel) => (
          <li key={hostel.id} className="p-4 border border-gray-300 rounded">
            <p>Hostel Name: {hostel.name}</p>
            {hostel.bookingDate ? (
          <div className='flex justify-between items-center flex-wrap'>
          <p>start Date: {new Date(hostel.bookingDate.seconds * 1000).toLocaleDateString()}</p>
          <p>end Date: {new Date(hostel.endDate.seconds * 1000).toLocaleDateString()}</p>
          </div>
            ) : (
              <p>Booking Date: Not available</p>
            )}
            <p>Status : 
              { hostel.status }
            
              </p>
          </li>
        ))}
      </ul>
    ) : (
      <p>You haven't dealt with bookings yet.</p>
    )}
  </div>
  )
}

export default HostelHistory
