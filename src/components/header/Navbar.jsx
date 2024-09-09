import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logout } from '../../services/auth';
import { useSearch } from '../../contexts/SearchContext';
import useSticky from '../../hooks/use-sticky';
import { FaBars } from 'react-icons/fa';
import Notifications from './Notifications';

import DarkMode from './DarkMode';
import Search from './Search';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { headerSticky } = useSticky();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState();
  const { currentUser } = useAuth();

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
        <Search/>
          {/* <NavLink to="/" className="text-white mx-2">Home</NavLink> */}
          <NavLink to="/register-hostel" className= "text-text mx-2 hover:text-hov ">Register your Hostel</NavLink>
          <NavLink to="/dashboard" className="text-text   hover:text-hov mx-2 ">Dashboard</NavLink>
          {
            currentUser && 
          <NavLink to="/messages" className="text-text   hover:text-hov mx-2 ">Messages</NavLink>

          }
          {user && (
            <button
              onClick={handleLogout}
              className="text-text   hover:text-hov mx-2"
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
