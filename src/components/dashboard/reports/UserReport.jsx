import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from '../../../firebase/Firebase';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../assets/common/logo.png';

const UserReport = () => {
  const [users, setUsers] = useState([]);
  const [tabUsers, setTabUsers] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All'); // Default to "All" tab


  const fetchUsers = async () => {
    if (!startDate || !endDate) {
      alert('Please select a valid date range.');
      return;
    }

    try {
      const bookingsRef = collection(firestore, 'bookings');
      const q = query(
        bookingsRef,
        where('bookingDate', '>=', startDate),
        where('bookingDate', '<=', endDate)
      );

      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);
      setTabUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleGenerateReport = () => {
    fetchUsers();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    // Add logo (replace with the actual base64 string or image URL)
    doc.addImage(logo, 'JPEG', 80, 10, 50, 30); // Adjust dimensions and positioning accordingly

  
    // Add report title below the logo
    doc.setFontSize(16);
    doc.text('User Booking Report "HostelEase"', 20, 50); // Position title accordingly
  
    // Add table with relevant user data
    const tableColumn = ['User', 'Hostel', 'Booking Date', 'Status'];
    const tableRows = tabUsers.map((user) => [
      user.userName,
      user.name,
      new Date(user.bookingDate.seconds * 1000).toLocaleDateString(),
      user.status,
    ]);
  
    // Start table after the title
    doc.autoTable(tableColumn, tableRows, { startY: 60 });
  
    // Get the final Y position of the table to place the footer after the table
    const finalY = doc.lastAutoTable.finalY || 70;
  
    // Footer text after the table
    doc.setTextColor(100); // Optional: Set text color (gray in this case)
    doc.setFont("helvetica", "bold"); // Set font style to bold
    doc.text("Created and Managed By: Hassan Fahad & Sajjad Ahmed", 20, finalY + 30);
  
    // Save the PDF with a meaningful filename
    doc.save('user_booking_report.pdf');
  };
  
  const handlePrint = () => {
    const doc = new jsPDF();
  
    // Add logo (replace with the actual base64 string or image URL)
    doc.addImage(logo, 'JPEG', 80, 10, 50, 30); // Adjust dimensions and positioning accordingly

  
    // Add report title below the logo
    doc.setFontSize(16);
    doc.text('User Booking Report "HostelEase"', 20, 50); // Position title accordingly
  
    // Add table with relevant user data
    const tableColumn = ['User', 'Hostel', 'Booking Date', 'Status'];
    const tableRows = tabUsers.map((user) => [
      user.userName,
      user.name,
      new Date(user.bookingDate.seconds * 1000).toLocaleDateString(),
      user.status,
    ]);
  
    // Start table after the title
    doc.autoTable(tableColumn, tableRows, { startY: 60 });
  
    // Get the final Y position of the table to place the footer after the table
    const finalY = doc.lastAutoTable.finalY || 70;
  
    // Footer text after the table
    doc.setTextColor(100); // Optional: Set text color (gray in this case)
    doc.setFont("helvetica", "bold"); // Set font style to bold
    doc.text("Created and Managed By: Hassan Fahad & Sajjad Ahmed", 20, finalY + 30);
  
    // Open the PDF in a new window for printing
    const pdfDataUrl = doc.output('dataurlstring');
    
    const printWindow = window.open();
    if (printWindow) {
      printWindow.document.write(
        `<iframe width='100%' height='100%' src='${pdfDataUrl}'></iframe>`
      );
      printWindow.document.close();
    }
  };
  




  const handleStatusTab = (tabValue) => {
    const tab = tabValue.toLowerCase();
    setSelectedTab(tab);

    if (tab === 'all') {
      setTabUsers(users); // Reset to show all bookings
    } else {
      const filteredUsers = users.filter((user) => user.status === tab);
      setTabUsers(filteredUsers);
    }
  };



  return (
    <div className="container mx-auto mt-10 min-h-screen dark:text-text">
      <h2 className="text-2xl font-bold mb-4">User Report</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Date Range</label>
        <div className="flex gap-4 flex-wrap">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Start Date"
            className="border p-2 rounded-md dark:bg-bgPrimaryDark"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText="End Date"
            className="border p-2 rounded-md dark:bg-bgPrimaryDark"
          />
        </div>
      </div>
      <div className="flex space-x-4 mb-4 flex-wrap space-y-4" >
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

      {tabUsers.length > 0 && (
        <div className="overflow-x-auto mt-4">
  <table className="min-w-full bg-white dark:text-text dark:bg-cardDark border border-icons ">
    <thead>
      <tr className="bg-gray-700 text-text text-left ">
        <th className="py-2 px-4 border-b">User</th>
        <th className="py-2 px-4 border-b">Hostel</th>
        <th className="py-2 px-4 border-b">Booking Date</th>
        <th className="py-2 px-4 border-b">Status</th>
      </tr>
    </thead>
    <tbody>
      {tabUsers.map((user) => (
        <tr key={user.id} className="hover:bg-gray-100 dark:hover:bg-slate-500">
          <td className="py-2 px-4 border-b">{user.userName}</td>
          <td className="py-2 px-4 border-b">{user.name}</td>
          <td className="py-2 px-4 border-b">
            {new Date(user.bookingDate.seconds * 1000).toLocaleDateString()}
          </td>
          <td className="py-2 px-4 border-b">{user.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      )}

      {users.length === 0 && (
        <p className="mt-4 text-gray-500">No users found for the selected date range.</p>
      )}
    </div>
  );
};

export default UserReport;
