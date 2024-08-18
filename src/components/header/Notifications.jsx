import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { FaTrashAlt, FaBell } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../firebase/Firebase';

const Notifications = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      if (currentUser) {
        const q = query(collection(firestore, 'bookings'), where('ownerId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingsData);
      }
    };

    const fetchNotifications = async () => {
      if (currentUser) {
        const q = query(collection(firestore, 'notifications'), where('ownerId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const notificationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(notificationsData);
      }
    };

    fetchBookings();
    fetchNotifications();
  }, [currentUser]);

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteDoc(doc(firestore, 'notifications', notificationId));
      setNotifications(notifications.filter(notification => notification.id !== notificationId));
      console.log('Notification deleted successfully');
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  return (
    <div>
      <div className="relative">
      <span class={`relative ${notifications.length > 0 ? 'flex' : 'hidden'}  h-3 w-3 `}>
<span class={` animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`}></span>
  {/* <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500 text-white">{notifications.length}</span> */}
</span>
        <FaBell onClick={() => setShowNotifications(!showNotifications)} className={`text-2xl cursor-pointer  hover:text-blue-500  ${notifications.length > 0 ? 'text-yellow-500 ' : 'text-white'}`} />
        {showNotifications && (
          <div className="absolute max-sm:-right-28 right-0 mt-2 w-[20rem] md:w-[30rem] bg-white text-black p-4 pb-10 z-50 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Notifications</h2>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id} className="flex justify-around  items-center mb-2 w-full border-y-[1px] border-y-gray-600 py-3">
                  <span className='text-sm me-3'>{notification.message}</span>
                  <FaTrashAlt
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="text-red-500 cursor-pointer text-2xl w-[20%] "
                  />
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
