import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase/Firebase';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchBookings = async () => {
      if (currentUser) {
        const bookingsRef = collection(firestore, 'bookings');
        const q = query(bookingsRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
      }
    };

    fetchBookings();
  }, [currentUser]);

  return (
    <div className="container mx-auto my-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Booking History</h1>
      {bookings.length > 0 ? (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li key={booking.id} className="p-4 border border-gray-300 rounded">
              <p>Hostel Name: {booking.name}</p>
              {booking.bookingDate ? (
                <p>Booking Date: {new Date(booking.bookingDate.seconds * 1000).toLocaleDateString()}</p>
              ) : (
                <p>Booking Date: Not available</p>
              )}
              <p>Status : 
                { booking.status }
              
                </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't made any bookings yet.</p>
      )}
    </div>
  );
};

export default BookingHistory;
