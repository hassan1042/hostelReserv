import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logout } from '../../services/auth';
import { useSearch } from '../../contexts/SearchContext';
import useSticky from '../../hooks/use-sticky';
import { FaBars } from 'react-icons/fa';
import Notifications from './Notifications';

import DarkMode from './DarkMode';

const Navbar = () => {
  const { headerSticky } = useSticky();
  const [user, setUser] = useState(null);
  const { searchTerm, setSearchTerm, filterType, setFilterType, setSearchResults } = useSearch();
  const [showMenu, setShowMenu] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults([]); // Clear previous results
    navigate('/search-results');
  };
  const handleMenu = () => {
    setShowMenu(!showMenu);
  }


  return (
    <nav className={`bg-gray-800 dark:bg-[#1e1e1e] p-4 text-black dark:text-black  ${headerSticky ? 'fixed top-0 ' : ''} z-50 w-full`}>
      <div className="container mx-auto flex justify-between max-lg:flex-col lg:items-center">
        <NavLink to="/" className="text-white text-lg font-bold">Hostel Reservation</NavLink>
        <div className="flex items-center max-lg:justify-end">
        {/** Menu */}
         <div className={`lg:flex   items-center ${ !showMenu ? 'hidden' : 'flex flex-col space-y-4 justify-between py-10 w-full h-auto' } lg:space-x-8`}>
         <form onSubmit={handleSearch} className="mr-4 flex items-center flex-wrap max-lg:justify-center max-lg:space-y-5">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                filterType === 'name' 
                ? 'Search by name' 
                : filterType === 'beds' 
                ? 'Min number of beds' 
                : 'Search by address'
              }
              className="p-2 rounded max-lg:w-[87%] "
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="p-2 rounded ml-2 max-lg:w-[70%]"
            >
              <option value="name">Name</option>
              <option value="beds">Number of Beds</option>
              <option value="address">Address</option>
            </select>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2 ">Search</button>
          </form>
          {/* <NavLink to="/" className="text-white mx-2">Home</NavLink> */}
          <NavLink to="/register-hostel" className="text-white mx-2 ">Register your Hostel</NavLink>
          <NavLink to="/dashboard" className="text-white mx-2 ">Dashboard</NavLink>
          {user && (
            <button
              onClick={handleLogout}
              className="text-white mx-2"
            >
              Logout
            </button>
          )}
        

        <div className='max-lg:hidden'>
        <Notifications />
        </div>
     
        <div className='max-lg:hidden'>
  <DarkMode/>
        </div>
         </div>
          <div className={`absolute right-5 top-5 text-2xl text-white lg:hidden`} onClick={handleMenu}>
      <FaBars />
      </div>
        </div>

      </div>
 
      <div className={`absolute right-32 top-5 text-2xl text-white lg:hidden`} >
      <Notifications />
      </div>
      <div className={`absolute right-20 top-4 text-xl text-white lg:hidden`} >
      <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
