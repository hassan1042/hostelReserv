import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";
import { firestore } from "../../../firebase/Firebase";
import ReportsTable from "./ReportsTable";
import ReportsButtons from "./ReportsButtons";
import StatusTabs from "./StatusTabs";
import DatePickerReports from "./DatePicker";

const UserReport = () => {
  const [users, setUsers] = useState([]);
  const [tabUsers, setTabUsers] = useState([]);
  const [allBtn, setShowAllBtn] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState("All"); // Default to "All" tab

  const fetchUsers = async () => {
    if (!startDate || !endDate) {
      alert("Please select a valid date range.");
      return;
    }

    try {
      const bookingsRef = collection(firestore, "bookings");
      const q = query(
        bookingsRef,
        where("bookingDate", ">=", startDate),
        where("bookingDate", "<=", endDate)
      );

      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(usersData);
      setTabUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleGenerateReport = () => {
    fetchUsers();
    setShowAllBtn(true);
  };

  return (
    <div className="container mx-auto mt-5 min-h-screen dark:text-text">
      <h2 className="max-sm:text-center text-xl md:text-2xl font-bold mb-4">
        User Reports
      </h2>

      <DatePickerReports
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <div>
        <StatusTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setTabBookings={setTabUsers}
          bookings={users}
        />
      </div>
      <ReportsButtons
        tabUsers={tabUsers}
        handleGenerateReport={handleGenerateReport}
        allBtn={allBtn}
      />
      <ReportsTable
        tabBookings={tabUsers}
        selectedTab={selectedTab}
        tabUsers={tabUsers}
        userReportComp={true}
      />
    </div>
  );
};

export default UserReport;
