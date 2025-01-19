import React, { useState } from "react";
import { addBooking } from "../../services/addBooking";

function BookingForm({
  selectedHostel,
  bookingDetails,
  // setBookingDetails,
  setShowBookingForm,
  setBookingSubmitted,
  error,
  setError,
  auth,
  handleBookingChange,
}) {
  const [amount, setAmount] = useState(0);
  const [receipt, setReceipt] = useState(null);

  const calculateAmount = () => {
    if (bookingDetails.startDate && bookingDetails.endDate) {
      const startDate = new Date(bookingDetails.startDate);
      const endDate = new Date(bookingDetails.endDate);
      const days = Math.ceil(
        (endDate - startDate) / (1000 * 60 * 60 * 24) // Convert milliseconds to days
      );
      setAmount(days * selectedHostel.price || 0);
    } else {
      setAmount(0);
    }
  };

  const handleReceiptChange = (e) => {
    const file = e.target.files[0];
    setReceipt(file);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate receipt upload
      if (!receipt) {
        alert("Please upload a payment receipt.");
        return;
      }
      calculateAmount();
      const bookingData = {
        hostelId: selectedHostel.id,
        name: selectedHostel.name,
        location: selectedHostel.location,
        roomNumber: selectedHostel.roomNumber,
        price: selectedHostel.price,
        ownerId: selectedHostel.ownerId,
        userName: bookingDetails.userName,
        userContact: bookingDetails.userContact,
        userId: auth.currentUser.uid,
        status: "pending",
        bookingDate: new Date(),
        startDate: new Date(bookingDetails.startDate),
        endDate: new Date(bookingDetails.endDate),
        amount,
        receipt, // Save receipt file to be processed later
    createdAt: new Date(),        // Store the creation date

      };

      await addBooking(bookingData);

      setShowBookingForm(false);
      setBookingSubmitted(true);
      alert("Booking request sent successfully");
    } catch (error) {
      console.error("Failed to book hostel:", error);
      alert("Booking failed, try again");
    }
  };

  return (
    <>
      <form
        onSubmit={handleBookingSubmit}
        className="absolute top-16 right-10 bg-white text-black p-4 rounded shadow-lg z-50"
      >
        <div className="mb-2">
          <label className="block">Name</label>
          <input
            type="text"
            name="userName"
            value={bookingDetails.userName}
            onChange={(e) => {
              const { name, value } = e.target;
              if (value.length <= 15) {
                handleBookingChange({ target: { name, value } });
              }
            }}
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
            onChange={(e) => {
              const { name, value } = e.target;
              if (value.length <= 11) {
                handleBookingChange({ target: { name, value } });
              }
            }}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex justify-between items-center flex-wrap">
          <div className="mb-2">
            <label className="block">Start Date of Stay</label>
            <input
              type="date"
              name="startDate"
              className="w-full p-2 border border-gray-300 rounded"
              value={bookingDetails.startDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                const { name, value } = e.target;
                if (
                  bookingDetails.endDate &&
                  new Date(value) > new Date(bookingDetails.endDate)
                ) {
                  setError("Start date cannot be after the end date.");
                  return;
                }
                setError("");
                handleBookingChange({ target: { name, value } });
                calculateAmount(); // Recalculate amount
              }}
            />
          </div>

          <div className="mb-2">
            <label className="block">End Date of Stay</label>
            <input
              type="date"
              name="endDate"
              className="w-full p-2 border border-gray-300 rounded"
              value={bookingDetails.endDate}
              min={
                bookingDetails.startDate ||
                new Date().toISOString().split("T")[0]
              }
              onChange={(e) => {
                const { name, value } = e.target;
                if (
                  bookingDetails.startDate &&
                  new Date(value) < new Date(bookingDetails.startDate)
                ) {
                  setError("End date cannot be before the start date.");
                  return;
                }
                setError("");
                handleBookingChange({ target: { name, value } });
                calculateAmount(); // Recalculate amount
              }}
            />
          </div>
        </div>

        {/* Show Amount */}
        <div className="mb-2">
          <label className="block">Total Amount</label>
          <p 
          onClick={calculateAmount}
          className="font-semibold cursor-pointer">{amount > 0 ? `PKR ${amount}` : "N/A"}</p>
        </div>

        {/* Upload Receipt */}
        <div className="mb-2">
          <label className="block">Upload Payment Receipt</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleReceiptChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit
        </button>
      </form>
   
    </>
  );
}

export default BookingForm;
