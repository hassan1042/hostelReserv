import React, { useState } from 'react';
import { FaHome, FaBook, FaHeart } from 'react-icons/fa';
import HostelsInfo from '../dashboard/HostelsInfo';
import BookingHistory from '../dashboard/booking/Booking';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
import { TbReportSearch } from "react-icons/tb";
import { RiFolderHistoryFill } from "react-icons/ri";
import FavoriteHostels from '../dashboard/favorites/Favorites';
import HostelHistory from '../dashboard/hostelHistory/HostelHistory';
import BookingSummaryReport from '../dashboard/reports/Reports';
import Tabs from '../dashboard/reports/Tabs';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('hostels');
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'hostels':
        return <HostelsInfo />;
      case 'bookings':
        return <BookingHistory />;
      case 'favorites':
        return <FavoriteHostels />;
        case 'hostels-history':
          return <HostelHistory/>;
          case 'reports':
            return <Tabs/>;
      default:
        return <HostelsInfo />;
    }
  };

  return (
    <div className="flex bg-text dark:bg-slate-950 ">
      {/* Sidebar */}
      <div className={`bg-bgSidebar dark:bg-bgSidebarDark  ${isExpanded ? 'md:w-64' : 'md:w-16'} max-md:w-16 transition-width duration-300 h-auto`}>
      
        <button
          className="text-white p-4 focus:outline-none max-md:hidden"
          onClick={toggleSidebar}
        >
          {isExpanded ? <FaAnglesLeft /> : <FaAnglesRight />}
        </button>
        <div className="mt-8 space-y-4">
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'hostels' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('hostels')}
          >
            <FaHome className="text-lg" />
            {isExpanded && <span className="ml-4 max-md:hidden">Hostels Info</span>}
          </button>
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'bookings' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            <FaBook className="text-lg" />
            {isExpanded && <span className="ml-4 max-md:hidden">Booking History</span>}
          </button>
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'favorites' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <FaHeart className="text-lg" />
            {isExpanded && <span className="ml-4 max-md:hidden">Favorite Hostels</span>}
          </button>
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'hostels-history' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('hostels-history')}
          >
            <RiFolderHistoryFill  className="text-lg" />
            {isExpanded && <span className="ml-4 max-md:hidden"> Hostels History</span>}
          </button>
          <button
            className={`flex items-center p-4 text-white w-full ${activeTab === 'reports' ? 'bg-blue-600' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <TbReportSearch  className="text-lg" />
            {isExpanded && <span className="ml-4 max-md:hidden"> Reports</span>}
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-2 lg:p-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
