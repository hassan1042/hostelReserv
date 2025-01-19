import React, { useState, useEffect } from "react";
import { FaBars,  } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHostel } from "../../contexts/HostelContext";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import useSticky from "../../hooks/use-sticky";
import LoginPage from "../common/auth/LoginPage";
import NavContent from "./nav/NavContent";

const Navbar = ({  showDialogBox, showDialog, setShowDialog }) => {
  const { selectedHostel } = useHostel();
  const { headerSticky } = useSticky();

  const [isOwner, setIsOwner] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    userContact: "",
    startDate: "",
    endDate: "",
  });
  const [slotsFull, setSlotsFull] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && selectedHostel) {
        setIsOwner(user.uid === selectedHostel.ownerId);
        setUserLoggedIn(true);
      } else {
        setIsOwner(false);
        setUserLoggedIn(false);
      }
    });

    if (auth.currentUser && selectedHostel) {
      setIsOwner(auth.currentUser.uid === selectedHostel.ownerId);
    }

    const fetchSlotsStatus = async () => {
      if (selectedHostel) {
        const hostelRef = doc(firestore, "hostels", selectedHostel.id);
        const hostelDoc = await getDoc(hostelRef);
        if (hostelDoc.exists()) {
          setSlotsFull(hostelDoc.data().slotsFull);
        }
      }
    };

    fetchSlotsStatus();

    return () => unsubscribe();
  }, [selectedHostel]);

  const handleBookNow = () => {
    if (!userLoggedIn) {
      setLogin(true);
    } else {
      setShowBookingForm(!showBookingForm);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const toggleSlotsAvailability = async () => {
    const newSlotsFullStatus = !slotsFull;
    setSlotsFull(newSlotsFullStatus);

    try {
      if (selectedHostel) {
        const hostelRef = doc(firestore, "hostels", selectedHostel.id);
        await updateDoc(hostelRef, { slotsFull: newSlotsFullStatus });
        console.log("Slots availability status updated");
      }
    } catch (error) {
      console.error("Failed to update slots status:", error);
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  //  to check if user is logged in while trying to book
  if (login) {
    return <LoginPage setLogin={setLogin} />;
  }
  return (
    <nav
      className={`flex relative max-lg:justify-between justify-center max-lg:items-between lg:space-x-24 ${
        showMenu ? "max-lg:flex-col" : ""
      } items-center p-4 bg-opacity-75 bg-black text-white lg:px-10 w-full z-50 ${
        headerSticky ? "fixed top-16 " : ""
      }`}
    >
      <h1 className="text-xl sm:text-2xl font-bold w-[30%] max-sm:w-[50%] capitalize">{selectedHostel.name}</h1>
      <div
        className={`absolute right-5 top-5 text-2xl lg:hidden`}
        onClick={handleMenu}
      >
        <FaBars />
      </div>
      <NavContent
        selectedHostel={selectedHostel}
        showMenu={showMenu}
        isOwner={isOwner}
        toggleSlotsAvailability={toggleSlotsAvailability}
        slotsFull={slotsFull}
        handleBookNow={handleBookNow}
        bookingSubmitted={bookingSubmitted}
        userLoggedIn={userLoggedIn}
        showDialog={showDialog}
        showDialogBox={showDialogBox}
        showBookingForm={showBookingForm}
        bookingDetails={bookingDetails}
        handleBookingChange={handleBookingChange}
        setBookingDetails={setBookingDetails}
        setShowBookingForm={setShowBookingForm}
        setBookingSubmitted={setBookingSubmitted}
        error={error}
        setError={setError}
        auth={auth}
      />
    </nav>
  );
};

export default Navbar;
