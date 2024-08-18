// src/services/hostels.js
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

const db = getFirestore();

export const deleteHostel = async (hostelId) => {
  try {
    const hostelRef = doc(db, 'hostels', hostelId);
    await deleteDoc(hostelRef);
  } catch (error) {
    throw error;
  }
};
