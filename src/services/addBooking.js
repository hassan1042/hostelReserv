import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addBooking = async (booking) => {
  const storage = getStorage(); // Initialize Firebase Storage
  let receiptUrl = null;

  // Upload the receipt file to Firebase Storage if it exists
  if (booking.receipt) {
    const receiptRef = ref(storage, `receipts/${Date.now()}_${booking.receipt.name}`);
    const snapshot = await uploadBytes(receiptRef, booking.receipt);
    receiptUrl = await getDownloadURL(snapshot.ref);
  }

  // Add the booking to Firestore
  const bookingRef = await addDoc(collection(firestore, "bookings"), {
    ...booking,
    receipt: receiptUrl, // Save the file's URL instead of the File object
  });

  // Create a notification for the owner
  await addDoc(collection(firestore, "notifications"), {
    ownerId: booking.ownerId,
    userId: booking.userId,
    roomNumber: booking.roomNumber,
    hostelName: booking.name,
    message: `You have a new booking from ${booking.userName} with contact # ${booking.userContact} for Room ${booking.roomNumber} of ${booking.name} from ${booking.startDate.toLocaleDateString()} to ${booking.endDate.toLocaleDateString()}.`,
    receiptUrl: receiptUrl, // Save the URL separately for rendering
    bookingId: bookingRef.id,
    timestamp: new Date(),
  });

  return bookingRef.id;
};


