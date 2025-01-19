import React, { useState, useEffect } from "react";
import { NavLink, useNavigate,  } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logout } from "../../services/auth";
import useSticky from "../../hooks/use-sticky";
import { FaBars } from "react-icons/fa";
import Notifications from "./Notifications";
import logo from "../../assets/common/logo.png";

import DarkMode from "./DarkMode";
import Search from "./Search";
import { useAuth } from "../../contexts/AuthContext";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { headerSticky } = useSticky();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState();
  const { currentUser } = useAuth();
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
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav
      className={`bg-bgUI dark:bg-bgUIDark px-4 max-md:py-2 text-black dark:text-black  ${
        headerSticky ? "fixed top-0 " : ""
      } z-50 w-full`}
    >
      <div className="container mx-auto flex justify-between  max-lg:flex-col lg:items-center">
        <NavLink
          to="/"
          className="text-white text-lg font-bold w-12 h-12 lg:h-16 lg:w-16 max-[220px]:me-3"
        >
          <img src={logo} alt="logo" />
        </NavLink>
        <div className="flex items-center max-lg:justify-end">
          {/** Menu */}
          <div
            className={`lg:flex   items-center ${
              !showMenu
                ? "hidden"
                : "flex flex-col space-y-4 justify-between py-10 w-full h-auto"
            } lg:space-x-8`}
          >
            <Search />
            {/* <NavLink to="/" className="text-white mx-2">Home</NavLink> */}
            <NavLink
              to="/register-hostel"
              className="text-text mx-2 hover:text-hovLinks "
            >
              Register your Hostel
            </NavLink>
            <NavLink
              to="/dashboard"
              className="text-text   hover:text-hovLinks mx-2 "
            >
              Dashboard
            </NavLink>
            {currentUser && (
              <NavLink
                to="/messages"
                className="text-text   hover:text-hovLinks mx-2 "
              >
                Messages
              </NavLink>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="text-text   hover:text-hovLinks mx-2 text-xl 2xl:text-2xl"
              >
                <MdLogout />
              </button>
            )}

            <div className="max-lg:hidden">
              <Notifications />
            </div>

            <div className="max-lg:hidden">
              <DarkMode />
            </div>
          </div>
          <div
            className={`absolute right-5 top-5 max-[220px]:text-xl max-[220px]:right-2 text-2xl text-white lg:hidden hover:text-hovLinks`}
            onClick={handleMenu}
          >
            <FaBars />
          </div>
        </div>
      </div>

      <div
        className={`absolute right-32 top-5 text-2xl text-white lg:hidden max-[220px]:text-xl max-[220px]:right-24`}
      >
        <Notifications />
      </div>
      <div
        className={`absolute right-20 top-4 text-xl text-white lg:hidden max-[220px]:text-xl max-[220px]:right-12`}
      >
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
