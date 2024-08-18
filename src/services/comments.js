// src/services/comments.js
import { collection, addDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

export const addComment = async (hostelId, comment) => {
  const commentsRef = collection(firestore, `hostels/${hostelId}/comments`);
  await addDoc(commentsRef, comment);
};

export const deleteComment = async (hostelId, commentToDelete) => {
  const commentsRef = collection(firestore, `hostels/${hostelId}/comments`);
  const querySnapshot = await getDocs(commentsRef);
  const commentDoc = querySnapshot.docs.find(doc => doc.data().text === commentToDelete.text);
  if (commentDoc) {
    await deleteDoc(doc(firestore, `hostels/${hostelId}/comments`, commentDoc.id));
  }
};

export const fetchComments = async (hostelId) => {
  const commentsRef = collection(firestore, `hostels/${hostelId}/comments`);
  const querySnapshot = await getDocs(commentsRef);
  return querySnapshot.docs.map(doc => doc.data());
};
