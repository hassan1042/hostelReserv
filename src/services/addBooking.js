import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

// Function to add a booking
export const addBooking = async (booking) => {
  const bookingRef = await addDoc(collection(firestore, 'bookings'), booking);
  
  // Optionally create a notification for the owner
  await addDoc(collection(firestore, 'notifications'), {
    ownerId: booking.ownerId,
    message: `You have a new booking from ${booking.userName} with contact # ${booking.userContact} for ${booking.name} .`,
    timestamp: new Date(),
  });

  return bookingRef.id;
};
