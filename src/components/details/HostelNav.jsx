import React, { useState, useEffect } from 'react';
import { FaBars, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { deleteHostel } from '../../services/deleteHostel';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHostel } from '../../contexts/HostelContext';
import { addBooking } from '../../services/addBooking';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';
import useSticky from '../../hooks/use-sticky';
import jsPDF from 'jspdf';
import LoginPage from '../common/auth/LoginPage';

const Navbar = ({ name, location, contact }) => {
  const { selectedHostel } = useHostel();
  const [isOwner, setIsOwner] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({ userName: '', userContact: '' });
  const [slotsFull, setSlotsFull] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const { headerSticky } = useSticky();
  const [showMenu, setShowMenu] = useState(false);
  const [showDownloadForm, setShowDownloadForm] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

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
        const hostelRef = doc(firestore, 'hostels', selectedHostel.id);
        const hostelDoc = await getDoc(hostelRef);
        if (hostelDoc.exists()) {
          setSlotsFull(hostelDoc.data().slotsFull);
        }
      }
    };

    fetchSlotsStatus();

    return () => unsubscribe();
  }, [selectedHostel]);

  const handleDeleteHostel = async () => {
    if (selectedHostel) {
      await deleteHostel(selectedHostel.id);
      navigate('/');
    }
  };

  const handleBookNow = () => {

    if(!userLoggedIn){
      setLogin(true)
       } else{
      setShowBookingForm(!showBookingForm);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBooking({
        hostelId: selectedHostel.id,
        name: selectedHostel.name,
        ownerId: selectedHostel.ownerId,
        userName: bookingDetails.userName,
        userContact: bookingDetails.userContact,
        userId: auth.currentUser.uid,
        status: 'pending',
        bookingDate: new Date(),
      });
      console.log('Booking successful');
      setShowBookingForm(false);
      setBookingSubmitted(true);
      setShowDownloadForm(true);
      alert('Booking Successful');
    } catch (error) {
      console.error('Failed to book hostel:', error);
      alert('Booking failed, try again');
    }
  };

  const toggleSlotsAvailability = async () => {
    const newSlotsFullStatus = !slotsFull;
    setSlotsFull(newSlotsFullStatus);

    try {
      if (selectedHostel) {
        const hostelRef = doc(firestore, 'hostels', selectedHostel.id);
        await updateDoc(hostelRef, { slotsFull: newSlotsFullStatus });
        console.log('Slots availability status updated');
      }
    } catch (error) {
      console.error('Failed to update slots status:', error);
    }
  };

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDownloadForm = () => {
    const doc = new jsPDF();

    // Content for the PDF
    doc.setFontSize(18);
    doc.text('Booking Confirmation', 20, 20);
    
    doc.setFontSize(12);
    doc.text(` ID: ${selectedHostel.id}`, 20, 40);
    doc.text(`Hostel Name: ${selectedHostel.name}`, 20, 50);
    doc.text(`Location: ${location}`, 20, 60);
    doc.text(`Number of Beds: ${selectedHostel.beds || 'N/A'}`, 20, 70);
    doc.text(`Booker's Name: ${bookingDetails.userName}`, 20, 80);
    doc.text(`Booker's Contact: ${bookingDetails.userContact}`, 20, 90);

    // Save the PDF
    doc.save('Booking_Confirmation.pdf');
  };
  //  to check if user is logged in while trying to book
if(login){
  return <LoginPage setLogin={setLogin}/>
}
  return (
    <nav className={`flex relative max-lg:justify-between justify-center max-lg:items-between ${showMenu ? 'max-lg:flex-col' : ''} items-center p-4 bg-opacity-75 bg-black text-white lg:px-10 w-full z-50 ${headerSticky ? 'fixed top-16 ' : ''}`}>
      <h1 className="text-xl sm:text-2xl font-bold lg:w-[80%]">{name}</h1>
      <div className={`absolute right-5 top-5 text-2xl lg:hidden`} onClick={handleMenu}>
        <FaBars />
      </div>
      <div className={`flex max-lg:flex-col max-lg:space-y-10 max-lg:mt-10 max-lg:h-[100vh] items-center lg:justify-between w-[80%] ${showMenu ? 'max-lg:flex' : 'max-lg:hidden'}`}>
        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-2" />
          <span>{location}</span>
        </div>
        <div className="flex items-center">
          <FaPhoneAlt className="mr-2" />
          <a href={`tel:${contact}`}>{contact}</a>
        </div>
        {isOwner ? (
          <button onClick={toggleSlotsAvailability} className="px-4 py-2 bg-yellow-500 text-white rounded">
            {slotsFull ? 'Slots Full' : 'Slots Available'}
          </button>
        ) : (
          <button
          onClick={handleBookNow}
          className="px-4 py-2 bg-green-500 text-white rounded"
          disabled={ slotsFull || bookingSubmitted}
        >
          {!userLoggedIn ? 'Log in to Book' : slotsFull ? 'Slots Not Available' : bookingSubmitted ? 'Booking Submitted' : 'Book Now'}
        </button>
        )}
        {showBookingForm &&
         (
          <form onSubmit={handleBookingSubmit} className="absolute top-16 right-0 bg-white text-black p-4 rounded shadow-lg z-50">
            <div className="mb-2">
              <label className="block">Name</label>
              <input
                type="text"
                name="userName"
                value={bookingDetails.userName}
                onChange={handleBookingChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Contact Number</label>
              <input
                type="number"
                name="userContact"
                value={bookingDetails.userContact}
                onChange={handleBookingChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </form>
        )}
        <div className="flex items-center">
          {isOwner  && (
            <button onClick={handleDeleteHostel} className="px-4 py-2 bg-red-500 text-white rounded">
              Delete Hostel
            </button>
          )}
        </div>
        {showDownloadForm && (
          <button onClick={handleDownloadForm} className="px-4 py-2 bg-blue-500 text-white rounded">
            Download Booking Form
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
