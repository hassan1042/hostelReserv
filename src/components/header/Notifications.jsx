import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore';
import { FaCheck, FaTimes, FaBell } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../firebase/Firebase';
import { onAuthStateChanged } from "firebase/auth";


const Notifications = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Fetch notifications where ownerId matches currentUser.uid
  useEffect(() => {
    const fetchNotifications = async () => {
      if (currentUser) {
        // console.log(currentUser.uid);
        const q = query(collection(firestore, 'notifications'), where('ownerId', '==', currentUser.uid));
        const p = query(collection(firestore, 'notifications'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const querySnapshotP = await getDocs(p);
        const notificationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        const notificationsDataP = querySnapshotP.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
        // console.log(notifications)
        setUserNotifications(notificationsDataP);
      }
    };

    fetchNotifications();
  }, [currentUser, onAuthStateChanged , ]);

  // Handle booking acceptance
  const handleAcceptBooking = async (bookingId , notification) => {
    try {
        // Update booking status to "rejected"
  const bookingRef = doc(firestore, 'bookings', bookingId);
  await updateDoc(bookingRef, { status: 'accepted' });
      const notificationRef = doc(firestore, 'notifications', notification.id);

      // Update booking status to accepted
      await updateDoc(notificationRef, { message: `Your booking for ${notification.hostelName} has been accepted.` });

      // Optionally send another notification to the user
      await addDoc(collection(firestore, 'notifications'), {
        userId: notification.userId,  // Notify the booking user
        message: `Your booking for ${notification.hostelName} has been accepted.`,
        timestamp: new Date(),
      });

      console.log('Booking accepted');
        // Remove notification from the list
        await deleteDoc(doc(firestore, 'notifications', notification.id));
    } catch (error) {
      console.error('Failed to accept booking:', error);
    }
  };

  // Handle booking rejection
  const handleRejectBooking = async (bookingId, notification) => {
    try {
  // Update booking status to "rejected"
  const bookingRef = doc(firestore, 'bookings', bookingId);
  await updateDoc(bookingRef, { status: 'rejected' });

      const notificationRef = doc(firestore, 'notifications', notification.id);

      // Update booking status to rejected
      await updateDoc(notificationRef, { message: `Your booking for ${notification.hostelName} has been rejected.` });


      // Notify the user about the rejection
      await addDoc(collection(firestore, 'notifications'), {
        userId: notification.userId,  // Notify the booking user
        message: `Your booking for ${notification.hostelName} has been rejected.`,
        timestamp: new Date(),
      });

      console.log('Booking rejected');
      await deleteDoc(doc(firestore, 'notifications', notification.id));

    } catch (error) {
      console.error('Failed to reject booking:', error);
    }
  };

  const handleDeleteUserNotification = async (curNotification) => {
        await deleteDoc(doc(firestore, 'notifications', curNotification.id));
             setNotifications(notifications.filter(notification => notification.id !== curNotification.Id));
  }

  return (
    <div>
      <div className="relative">
        <FaBell
          onClick={() => setShowNotifications(!showNotifications)}
          className={`text-2xl cursor-pointer hover:text-hov ${notifications.length > 0 ? 'text-yellow-500' : 'text-text'} hover:text-hovLinks`}
        />
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-[20rem] md:w-[30rem] bg-white text-black p-4 pb-10 z-50 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Notifications</h2>
            <ul>
              {notifications && notifications.map((notification) => (
                <li key={notification.id} className="flex justify-between items-center mb-2 w-full border-y-[1px] border-y-gray-600 py-3">
                  <span className="text-sm">{notification.message}</span>
                  <div className="flex space-x-2">
                    <FaCheck
                      onClick={() => handleAcceptBooking(notification.bookingId, notification)}
                      className="text-green-500 cursor-pointer text-xl"
                    />
                    <FaTimes
                      onClick={() => handleRejectBooking(notification.bookingId, notification)}
                      className="text-red-500 cursor-pointer text-xl"
                    />
                  </div>
                </li>
              ))}
            </ul>
            <ul>
              {userNotifications.map((notification) => (
                <li key={notification.id} className="flex justify-between items-center mb-2 w-full border-y-[1px] border-y-gray-600 py-3">
                  <span className="text-sm">{notification.message}</span>
                  <div className="flex space-x-2">
                                      <FaTimes
                      onClick={() => handleDeleteUserNotification(notification)}
                      className="text-red-500 cursor-pointer text-xl"
                    /> 
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
