import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase/Firebase';
import VoucherCard from '../common/VoucherCard';
import { CiSearch } from 'react-icons/ci';


const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const auth = getAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [hostel, setHostel] = useState([]);

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
        setHostel(bookingsData);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchedHostel = hostel.filter((hos) => hos.name === searchTerm);
      setBookings(searchedHostel);
    }
  };

  return (
    <div className="container mx-auto my-10 min-h-screen dark:text-text">
      <h1 className="text-xl max-sm:text-center md:text-2xl font-bold mb-4">Your Booking History</h1>
      {/** Form to Search Specific Hostel Booking */}
      <form onSubmit={handleSearch}
      className='mx-auto my-5 relative w-fit'
       action="">
        <input
          type="text"
          value={searchTerm}
          className='text-black  py-2 px-4 border rounded-md border-icons focus:border-iconsDark focus:outline-none'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for Hostel'
        />
        <button
        className=' absolute top-1 right-2 text-3xl font-bold  cursor-pointer text-black'
         type="submit"><CiSearch /></button>
      </form>
      <div className="flex justify-around items-center flex-wrap">
        {bookings.length > 0 ? (
        
        <VoucherCard hostels={bookings} />

        ) : (
          <p className="text-gray-500 dark:text-gray-200">
            You haven't made any bookings yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
