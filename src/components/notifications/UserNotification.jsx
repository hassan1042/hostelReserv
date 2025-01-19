import React, { useEffect, useState } from "react";
import {
  fetchUserNotifications,
  handleDeleteUserNotification,
} from "../../services/notificationService";
import { FaTimes } from "react-icons/fa";

function UserNotification({ currentUser }) {
  const [userNotifications, setUserNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        const notificationsDataUser = await fetchUserNotifications(currentUser);
        setUserNotifications(notificationsDataUser);
      }
    };

    fetchNotifications();
  }, [currentUser]);

  return (
    <ul>
      {userNotifications.map((notification) => (
       !notification.ownerId &&
       <li
          key={notification.id}
          className="flex justify-between items-center mb-2 w-full border-y-[1px] border-y-gray-600 py-3"
        >
          <span className="text-sm">{notification.message}</span>
          <div className="flex space-x-2">
            <FaTimes
              onClick={() => handleDeleteUserNotification(setUserNotifications , notification)}
              className="text-red-500 cursor-pointer text-xl"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UserNotification;
