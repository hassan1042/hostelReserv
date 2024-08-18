import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../firebase/Firebase';

export const addHostel = async (hostel) => {
  const hostelRef = collection(firestore, 'hostels');
  const docRef = await addDoc(hostelRef, { ...hostel, comments: [] });
  return docRef.id;
};

export const uploadFile = async (file, folder) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
};
