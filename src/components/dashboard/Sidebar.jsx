import React, { useState } from "react";
import { FaHome, FaBook, FaHeart } from "react-icons/fa";
import HostelsInfo from "../dashboard/HostelsInfo";
import BookingHistory from "../dashboard/booking/Booking";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { RiFolderHistoryFill } from "react-icons/ri";
import FavoriteHostels from "../dashboard/favorites/Favorites";
import HostelHistory from "../dashboard/hostelHistory/HostelHistory";
import Tabs from "../dashboard/reports/Tabs";
import { useAuth } from "../../contexts/AuthContext";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("hostels");
  const [isExpanded, setIsExpanded] = useState(true);
  const { currentUser } = useAuth();


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const sidebarContent = [
    {
      content: "Hostels Info",
      icon: <FaHome />,
    },
    {
      content: "Booking History",
      icon: <FaBook />,
    },
    {
      content: "Favourite Hostels",
      icon: <FaHeart />,
    },
    {
      content: "Hostels History",
      icon: <RiFolderHistoryFill />,
    },
    // {
    //   content: "Reports",
    //   icon: <TbReportSearch />,
    // },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Hostels Info":
        return <HostelsInfo />;
      case "Booking History":
        return <BookingHistory />;
      case "Favourite Hostels":
        return <FavoriteHostels />;
      case "Hostels History":
        return <HostelHistory />;
      case "Reports":
        return <Tabs />;
      default:
        return <HostelsInfo />;
    }
  };

  return (
    <div className="flex bg-text dark:bg-slate-950 min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-bgSidebar dark:bg-bgSidebarDark  h-auto  ${
          isExpanded ? "md:w-64" : "md:w-16"
        } max-md:w-16 transition-width duration-300 `}
      >
        <button
          className="text-white p-4 focus:outline-none max-md:hidden fixed top-16"
          onClick={toggleSidebar}
        >
          {isExpanded ? <FaAnglesLeft /> : <FaAnglesRight />}
        </button>
        <div className={`mt-8 space-y-4 fixed top-20
         ${
          isExpanded ? "md:w-64" : "md:w-16"
        } max-md:w-16 transition-width duration-300 
        `}>
          {sidebarContent.map((side, i) => (
            <button
            key={i}
              className={`flex items-center p-4 text-white w-[93%] space-x-4 ${
                activeTab === side.content ? "bg-blue-600" : ""
              }`}
              onClick={() => setActiveTab(side.content)}
            >
              <i className="text-lg">{side.icon}</i>
              {isExpanded && (
                <span className=" max-md:hidden">{side.content}</span>
              )}
            </button>
          ))}
        {
          currentUser.uid === '4LVZYe8BQlfj9pt2EvqObpLI5Mf1' &&
          <button
            
            className={`flex items-center p-4 text-white  space-x-4 w-[93%] ${
              activeTab === "Reports" ? "bg-blue-600" : ""
            }`}
            onClick={() => setActiveTab("Reports")}
          >
            <i className="text-lg"><TbReportSearch/></i>
            {isExpanded && (
              <span className=" max-md:hidden">Reports</span>
            )}
          </button>
        }
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-2 lg:p-8">{renderContent()}</div>
    </div>
  );
}


export default Sidebar;
