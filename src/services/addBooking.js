import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

// Function to add a booking
export const addBooking = async (booking) => {
  const bookingRef = await addDoc(collection(firestore, 'bookings'), {
    ...booking,
    startDate: booking.startDate, // Ensure startDate is included
    endDate: booking.endDate,     // Ensure endDate is included
    status: 'pending',            // Set status as pending when booking is added
    createdAt: new Date(),        // Store the creation date
  });

  // Create a notification for the owner with the start and end date included
  await addDoc(collection(firestore, 'notifications'), {
    ownerId: booking.ownerId,
    userId: booking.userId,
    hostelName: booking.name,
    message: `You have a new booking from ${booking.userName} with contact # ${booking.userContact} for ${booking.name} from ${booking.startDate.toLocaleDateString()} to ${booking.endDate.toLocaleDateString()}.`,
    bookingId: bookingRef.id,     // Link the notification to the booking
    timestamp: new Date(),
  });

  return bookingRef.id;
};
