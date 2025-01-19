import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import BookingForm from "../BookingForm";
import DeleteHostel from "./DeleteHostel";

function NavContent({
  selectedHostel,
  showMenu,
  isOwner,
  toggleSlotsAvailability,
  slotsFull,
  handleBookNow,
  bookingSubmitted,
  userLoggedIn,
  showDialog,
  showDialogBox,
  showBookingForm,
  bookingDetails,
  handleBookingChange,
  setBookingDetails,
  setShowBookingForm,
  setBookingSubmitted,
  error,
  setError,
  auth,
}) {
  return (
    <div
      className={`flex max-lg:flex-col max-lg:space-y-10 max-lg:mt-10 max-lg:h-[100vh] items-center lg:justify-between w-full ${
        showMenu ? "max-lg:flex" : "max-lg:hidden"
      }`}
    >
      <div className="flex items-center capitalize">
        <FaMapMarkerAlt className="mr-2" />
        <span>{selectedHostel.location}</span>
      </div>
      <div className="flex items-center">
        <MdOutlinePayments className="mr-2" />
        <div title="Online Payment">{selectedHostel.payment}</div>
      </div>
      <p title="Price per day">
        Rs:<span className="italic">{selectedHostel.price}</span>
      </p>
      {isOwner ? (
        <button
          onClick={toggleSlotsAvailability}
          className="px-4 py-2 bg-hov hover:bg-hovDark text-text  rounded"
        >
          {slotsFull ? "Slots Full" : "Slots Available"}
        </button>
      ) : (
        <button
          onClick={handleBookNow}
          className="px-4 py-2 bg-hov hover:bg-hovDark text-text  rounded"
          disabled={slotsFull || bookingSubmitted}
        >
          {!userLoggedIn
            ? "Log in to Book"
            : slotsFull
            ? "Slots Not Available"
            : bookingSubmitted
            ? "Booking Submitted"
            : "Book Now"}
        </button>
      )}
      {isOwner && (
        <DeleteHostel
          showDialog={showDialog}
          showDialogBox={showDialogBox}
          selectedHostel={selectedHostel}
        />
      )}
      {showBookingForm && (
        <BookingForm
          selectedHostel={selectedHostel}
          bookingDetails={bookingDetails}
          handleBookingChange={handleBookingChange}
          setBookingDetails={setBookingDetails}
          setShowBookingForm={setShowBookingForm}
          setBookingSubmitted={setBookingSubmitted}
          error={error}
          setError={setError}
          auth={auth}
          isOwner={isOwner}
        />
      )}
    </div>
  );
}

export default NavContent;
