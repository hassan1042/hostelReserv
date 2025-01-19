import React, { useEffect, useState } from "react";
import {
  fetchOwnerNotifications,
  handleAcceptBooking,
  handleRejectBooking,
} from "../../services/notificationService";
import { FaCheck, FaReceipt, FaTimes } from "react-icons/fa";

function OwnerNotifications({ currentUser }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        const notificationsDataOwner = await fetchOwnerNotifications(
          currentUser
        );

        setNotifications(notificationsDataOwner);
      }
    };

    fetchNotifications();
  }, [currentUser]);
  return (
    <ul>
      {notifications &&
        notifications.map((notification) => {
          return (
            notification.ownerId === currentUser.uid && (
              <li
                key={notification.id}
                className="flex justify-between items-center mb-2 w-full border-y-[1px] border-y-gray-600 py-3"
              >
                <span className="text-[10px] sm:text-sm">
                  {notification.message}
                </span>

                <div className="flex space-x-2">
                  <a
                    title="view receipt"
                    href={notification.receiptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    <FaReceipt />
                  </a>
                  <FaCheck
                    title="accept booking"
                    onClick={() =>
                      handleAcceptBooking(
                        notification.bookingId,
                        notification,
                        setNotifications
                      )
                    }
                    className="text-green-500 cursor-pointer text-xl"
                  />
                  <FaTimes
                    title="reject booking"
                    onClick={() =>
                      handleRejectBooking(
                        notification.bookingId,
                        notification,
                        setNotifications
                      )
                    }
                    className="text-red-500 cursor-pointer text-xl"
                  />
                </div>
              </li>
            )
          );
        })}
    </ul>
  );
}

export default OwnerNotifications;
