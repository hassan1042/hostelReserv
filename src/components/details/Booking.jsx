// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { addBooking } from '../../services/addBooking';

// const BookNow = ({ hostelId }) => {
//   const { currentUser } = useAuth();
//   const [booking, setBooking] = useState({
//     startDate: '',
//     endDate: '',
//     contact: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBooking({ ...booking, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!currentUser) {
//       alert('You must be logged in to make a booking.');
//       return;
//     }
//     try {
//       await addBooking({
//         ...booking,
//         hostelId,
//         userId: currentUser.uid,
//       });
//       alert('Booking successful!');
//     } catch (error) {
//       console.error('Failed to book hostel:', error);
//       alert('Booking failed.');
//     }
//   };

//   return (
//     <div className="container mx-auto my-10">
//       <h1 className="text-2xl font-bold mb-4">Book Now</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700">Start Date</label>
//           <input
//             type="date"
//             name="startDate"
//             value={booking.startDate}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">End Date</label>
//           <input
//             type="date"
//             name="endDate"
//             value={booking.endDate}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Contact Number</label>
//           <input
//             type="text"
//             name="contact"
//             value={booking.contact}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
//             required
//           />
//         </div>
//         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//           Book Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookNow;
