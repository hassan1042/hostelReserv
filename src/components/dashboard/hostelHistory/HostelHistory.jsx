import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { firestore } from "../../../firebase/Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import VoucherCard from "../common/VoucherCard";
import { CiSearch } from 'react-icons/ci';


function HostelHistory() {
  const { currentUser } = useAuth();
  const [hostels, setHostels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (currentUser) {
        const bookingsRef = collection(firestore, "bookings");
        const q = query(bookingsRef, where("ownerId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const hostelsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHostels(hostelsData);
        setUsers(hostelsData);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchedUser = users.filter((user) => user.userName === searchTerm);
      setHostels(searchedUser);
    }
  };

  return (
    <div className="container mx-auto my-10 min-h-screen dark:text-text">
      <h1 className="text-xl max-sm:text-center md:text-2xl font-bold mb-4">Your Hostels History</h1>
      <form onSubmit={handleSearch}
      className='mx-auto my-5 relative w-fit'
       action="">
        <input
          type="text"
          value={searchTerm}
          className='text-black  py-2 px-4 border rounded-md border-icons focus:border-iconsDark focus:outline-none'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search for User'
        />
        <button
        className=' absolute top-1 right-2 text-3xl font-bold  cursor-pointer text-black'
         type="submit"><CiSearch /></button>
      </form>
      {hostels.length > 0 ? (
        <VoucherCard hostels={hostels} />
      ) : (
        <p className="text-gray-500 max-sm:px-3 text-justify">No bookings for your hostels available</p>
      )}
    </div>
  );
}

export default HostelHistory;
