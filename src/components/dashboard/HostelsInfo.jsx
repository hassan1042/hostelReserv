import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useHostel } from "../../contexts/HostelContext";
import LoadingScreen from "../common/loading/Loading";

const HostelsInfo = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState({}); // Store bookings count by hostelId
  const { selectHostel } = useHostel();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const hostelsCollection = collection(firestore, "hostels");
        const hostelsSnapshot = await getDocs(hostelsCollection);
        const hostelsData = hostelsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch bookings and count them by hostelId
        const bookingsCollection = collection(firestore, "bookings");
        const bookingsSnapshot = await getDocs(bookingsCollection);
        const bookingsData = bookingsSnapshot.docs.map((doc) => doc.data());

        const bookingsCount = bookingsData.reduce((acc, booking) => {
          acc[booking.hostelId] = (acc[booking.hostelId] || 0) + 1;
          return acc;
        }, {});

        setHostels(hostelsData);
        setBookings(bookingsCount);
      } catch (error) {
        console.error("Error fetching hostels or bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, []);

  const handleRowClick = (hostel) => {
    selectHostel(hostel);
    navigate("/hostel-details");
  };
  const tableHeadContent = [
    {
      lg: "Hostel Name",
      sm: "Name",
    },
    {
      lg: "Location",
      sm: "Loc",
    },
    {
      lg: "Price Per Month",
      sm: "PPM",
    },
    {
      lg: "Slots",
      sm: "Slots",
    },
    {
      lg: "No of Bookings",
      sm: "Books",
    },
  ];
  return (
    <div className="max-lg:w-full lg:container mx-auto min-h-[120vh]">
      {loading ? (
        <LoadingScreen/>
      ) : (
        <table className="w-full bg-text dark:bg-cardDark dark:text-text shadow-md rounded-lg table-auto">
          <thead className="bg-bgUI dark:bg-bgUIDark text-text w-full ">
            <tr>
              {tableHeadContent.map((head) => (
                <th className="p-2 lg:p-4 text-left">
                  <span className="max-lg:hidden">{head.lg}</span>{" "}
                  <span className="lg:hidden">{head.sm}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hostels.map((hostel) => (
              <tr
                onClick={() => handleRowClick(hostel)}
                key={hostel.id}
                className="border-b border-gray-200 cursor-pointer hover:bg-gray-500 transition-colors duration-150"
              >
                <td className="p-2 lg:p-4 font-medium max-md:text-sm">
                  {hostel.name}
                </td>
                <td className="p-2 lg:p-4 max-lg:hidden">{hostel.location}</td>
                <td className="p-2 lg:p-4 max-md:text-[12px]">
                  <span className="max-lg:hidden ">Rs/</span>
                  {hostel.price}
                </td>
                <td className="p-2 lg:p-4">
                  {hostel.slotsFull ? (
                    <span className="text-red-600 flex items-center">
                      <FaTimes className="mr-1" />{" "}
                      <span className="max-lg:hidden">Full</span>
                    </span>
                  ) : (
                    <span className="text-green-600 flex items-center">
                      <FaCheck className="mr-1" />{" "}
                      <span className="max-lg:hidden">Available</span>
                    </span>
                  )}
                </td>
                <td className="p-4 text-center">{bookings[hostel.id] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HostelsInfo;
