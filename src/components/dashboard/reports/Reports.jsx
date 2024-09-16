import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from '../../../firebase/Firebase';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ReportsTable from './ReportsTable';

const BookingSummaryReport = () => {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState('');
  const [bookings, setBookings] = useState([]);
  const [tabBookings, setTabBookings] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All'); // Default to "All" tab

  useEffect(() => {
    // Fetch all hostels for the dropdown
    const fetchHostels = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'hostels'));
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
      alert('Please select a valid date range.');
      return;
    }

    try {
      const bookingsRef = collection(firestore, 'bookings');
      let q = query(
        bookingsRef,
        where('bookingDate', '>=', startDate),
        where('bookingDate', '<=', endDate)
      );

      if (selectedHostel) {
        q = query(q, where('hostelId', '==', selectedHostel));
      }

      const querySnapshot = await getDocs(q);
      const bookingsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(bookingsData);
      setTabBookings(bookingsData); // Set initial bookings to tabBookings
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleGenerateReport = () => {
    fetchBookings();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['Hostel', 'Booking Date', 'User', 'Status'];
    const tableRows = tabBookings.map((booking) => [
      booking.name,
      new Date(booking.bookingDate.seconds * 1000).toLocaleDateString(),
      booking.userName,
      booking.status,
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text('Booking Summary Report', 14, 15);
    doc.save('booking_summary_report.pdf');
  };

  const handleStatusTab = (tabValue) => {
    const tab = tabValue.toLowerCase();
    setSelectedTab(tab);

    if (tab === 'all') {
      setTabBookings(bookings); // Reset to show all bookings
    } else {
      const filteredBookings = bookings.filter((booking) => booking.status === tab);
      setTabBookings(filteredBookings);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto mt-10 min-h-screen dark:text-text">
      <h1 className="text-2xl font-bold mb-4">Booking Summary Report</h1>

      {/* Date Range Picker */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Date Range</label>
        <div className="flex gap-4 flex-wrap">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="border p-2 rounded-md dark:bg-bgPrimaryDark "
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="border p-2 rounded-md dark:bg-bgPrimaryDark"
          />
        </div>
      </div>

      {/* Hostel Selection */}
      <div className="mb-4 max-sm:w-[80%]">
        <label className="block font-semibold mb-2">Select Hostel (Optional)</label>
        <select
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
          className="border p-2 rounded-md w-full dark:bg-bgPrimaryDark"
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
      <div className="flex space-x-4 mb-4 flex-wrap space-y-4">
        {['All', 'Pending', 'Accepted', 'Rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => handleStatusTab(tab)}
            className={`px-4 py-2 rounded-md ${selectedTab === tab.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-300'} dark:bg-bgPrimaryDark`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Actions */}
      <button
        onClick={handleGenerateReport}
        className="bg-blue-500 dark:bg-blue-900 text-white px-4 py-2 rounded-md mr-4 mb-3"
      >
        Generate Report
      </button>
      <button
        onClick={handleDownloadPDF}
        className="bg-green-500 dark:bg-green-900 text-white px-4 py-2 rounded-md mr-4 mb-3"
      >
        Download PDF
      </button>
      <button
        onClick={handlePrint}
        className="bg-yellow-500 dark:bg-yellow-900 text-white px-4 py-2 rounded-md mb-3"
      >
        Print Report
      </button>

    {/* Booking List */}
      <ReportsTable tabBookings={tabBookings} selectedTab={selectedTab}/>


      {tabBookings.length === 0 && (
        <p className="mt-4 text-gray-500 dark:text-gray-300">No bookings found for the selected date range.</p>
      )}
    </div>
  );
};

export default BookingSummaryReport;
