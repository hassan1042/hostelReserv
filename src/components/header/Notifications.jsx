import React, {useState } from "react";

import { FaBell } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import UserNotification from "../notifications/UserNotification";
import OwnerNotifications from "../notifications/OwnerNotifications";

const Notifications = () => {
  const { currentUser } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div>
      <div className="relative">
        <FaBell
          onClick={() => setShowNotifications(!showNotifications)}
          className={`text-xl 2xl:text-2xl cursor-pointer hover:text-hov  text-hovLinks`}
        />
        {showNotifications && (
          <div className="absolute overflow-y-scroll h-[70vh] max-[220px]:-right-24 max-[290px]:-right-32 max-sm:-right-28 right-0 mt-2 max-sm:mt-5 min-[200px]:w-[13rem]  min-[230px]:w-[14rem] min-[260px]:w-[17rem] min-[345px]:w-[20rem] md:w-[30rem] bg-white dark:bg-cardDark dark:text-text text-black p-4 pb-10 z-50 rounded shadow-lg">
            <h2 className="text-sm md:text-lg font-bold mb-2">Notifications</h2>
            <OwnerNotifications currentUser={currentUser} />
            <UserNotification currentUser={currentUser} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
