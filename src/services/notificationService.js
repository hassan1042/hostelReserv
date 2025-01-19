import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../firebase/Firebase";

// Handle deleting notifications
export const handleDeleteUserNotification = async (setUserNotifications, curNotification) => {
  try {
    const commentRef = doc(firestore, "notifications", curNotification.id);
    await deleteDoc(commentRef);
      // Update the local state
      setUserNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== curNotification.id)
      );
    console.log("Notification deleted successfully");
    alert("Notification deleted successfully");
  } catch (error) {
    console.error("Error deleting Notification: ", error);
  }
};
// Handle fetching owner notifications
export const fetchOwnerNotifications = async (currentUser) => {
    console.log(currentUser.uid)
  const q = query(
    collection(firestore, "notifications"),
    where("ownerId", "==", currentUser.uid)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
// Handle fetching user notifications
export const fetchUserNotifications = async (currentUser) => {
  const p = query(
    collection(firestore, "notifications"),
    where("userId", "==", currentUser.uid)
  );
  const querySnapshotP = await getDocs(p);

  return querySnapshotP.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const handleAcceptBooking = async (bookingId, notification, setNotifications) => {
    try {
      const bookingRef = doc(firestore, "bookings", bookingId);
      await updateDoc(bookingRef, { status: "accepted" });
  
      const notificationRef = doc(firestore, "notifications", notification.id);
      await updateDoc(notificationRef, {
        message: `Your booking for ${notification.hostelName} has been accepted.`,
      });
  
      await addDoc(collection(firestore, "notifications"), {
        userId: notification.userId, // Notify the booking user
        message: `Your booking for ${notification.hostelName} has been accepted.`,
        timestamp: new Date(),
      });
  
      await deleteDoc(notificationRef);
  
      // Update the local state
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== notification.id)
      );
  
      alert("Booking accepted");
    } catch (error) {
      console.error("Failed to accept booking:", error);
      alert("Failed to accept booking");
    }
  };
  
  export const handleRejectBooking = async (bookingId, notification, setNotifications) => {
    try {
      const bookingRef = doc(firestore, "bookings", bookingId);
      await updateDoc(bookingRef, { status: "rejected" });
  
      const notificationRef = doc(firestore, "notifications", notification.id);
      await updateDoc(notificationRef, {
        message: `Your booking for ${notification.hostelName} has been rejected.`,
      });
  
      await addDoc(collection(firestore, "notifications"), {
        userId: notification.userId, // Notify the booking user
        message: `Your booking for ${notification.hostelName} has been rejected.`,
        timestamp: new Date(),
      });
  
      await deleteDoc(notificationRef);
  
      // Update the local state
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== notification.id)
      );
  
      alert("Booking rejected");
    } catch (error) {
      console.error("Failed to reject booking:", error);
      alert("Failed to reject booking");
    }
  };
  