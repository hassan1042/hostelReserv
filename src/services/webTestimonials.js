// src/services/webTestimonials.js
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase'; // Adjust the import path

const testimonialsCollection = collection(firestore, 'websiteTestimonials');

export const addTestimonial = async (testimonial) => {
  try {
    const docRef = await addDoc(testimonialsCollection, testimonial);
    return docRef.id; // Return the ID of the added document
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw new Error('Failed to add testimonial');
  }
};
