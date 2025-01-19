import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";
import { firestore } from "../../../firebase/Firebase";
import ReportsTable from "./ReportsTable";
import StatusTabs from "./StatusTabs";
import ReportsButtons from "./ReportsButtons";
import DatePickerReports from "./DatePicker";

const BookingSummaryReport = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState("");
  const [bookings, setBookings] = useState([]);
  const [tabBookings, setTabBookings] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All"); // Default to "All" tab
  const [allBtn, setShowAllBtn] = useState(false);


  useEffect(() => {
    // Fetch all hostels for the dropdown
    const fetchHostels = async () => {
      const querySnapshot = await getDocs(collection(firestore, "hostels"));
      const hostelsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setHostels(hostelsData);
    };

    fetchHostels();
  }, []);

  const fetchBookings = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const bookingsRef = collection(firestore, "bookings");
      let q = query(
        bookingsRef,
        where("bookingDate", ">=", startDate),
        where("bookingDate", "<=", endDate)
      );

      if (selectedHostel) {
        q = query(q, where("hostelId", "==", selectedHostel));
      }

      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsData);
      setTabBookings(bookingsData); // Set initial bookings to tabBookings
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleGenerateReport = () => {
    fetchBookings();
    setShowAllBtn(true);
  };

  return (
    <div className="container mx-auto mt-5 min-h-screen dark:text-text">
      <h1 className="text-xl max-sm:text-center md:text-2xl font-bold mb-4">
        Booking Summary Report
      </h1>

      {/* Date Range Picker */}
      <DatePickerReports
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />

      {/* Hostel Selection */}
      <div className="mb-4">
        <label className="max-sm:text-lg block font-semibold mb-2 ">
          Select Hostel (Optional)
        </label>
        <select
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
          className="border p-2 rounded-md w-full dark:bg-bgPrimaryDark max-sm:w-[80%] "
        >
          <option value="">All Hostels</option>
          {hostels.map((hostel) => (
            <option key={hostel.id} value={hostel.id}>
              {hostel.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs for Booking Status */}
      <StatusTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} setTabBookings={setTabBookings} bookings={bookings}/>

      {/* Actions */}
      <ReportsButtons
        tabUsers={tabBookings}
        handleGenerateReport={handleGenerateReport}
        allBtn={allBtn}
      />

      {/* Booking List */}
      <ReportsTable
        tabBookings={tabBookings}
        selectedTab={selectedTab}
        hostelReportComp={true}
      />
    </div>
  );
};

export default BookingSummaryReport;
