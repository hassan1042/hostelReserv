// src/services/fetchHostels.js
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

export const fetchHostels = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'hostels'));
    const hostelsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return hostelsList;
  } catch (error) {
    console.error('Error fetching hostels:', error);
    throw new Error('Failed to fetch hostels');
  }
};
