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
    <div className="container mx-auto my-10 min-h-screen dark:text-text">
      <h1 className="text-2xl font-bold mb-4">Your Booking History</h1>
      {bookings.length > 0 ? (
  <div className="space-y-6">
    {bookings.map((booking) => (
      <div key={booking.id} className="bg-gray-50 shadow-md rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-2">Hostel Name: {booking.name}</h3>

        {booking.bookingDate ? (
          <p className="text-gray-600">
            <span className="font-medium">Booking Date:</span>{' '}
            {new Date(booking.bookingDate.seconds * 1000).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-gray-500">Booking Date: Not available</p>
        )}

        <p className="text-gray-600">
          <span className="font-medium">Status:</span>{' '}
          <span
            className={`px-2 py-1 rounded-md ${
              booking.status === 'accepted'
                ? 'bg-green-200 text-green-700'
                : booking.status === 'rejected'
                ? 'bg-red-200 text-red-700'
                : 'bg-yellow-200 text-yellow-700'
            }`}
          >
            {booking.status}
          </span>
        </p>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500">You haven't made any bookings yet.</p>
)}

    </div>
  );
};

export default BookingHistory;
