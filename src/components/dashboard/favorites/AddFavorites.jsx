import React from 'react';
import { arrayUnion, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { CiHeart } from 'react-icons/ci';
import { firestore } from '../../../firebase/Firebase';

function AddToFavorites({ id }) {
  const auth = getAuth();

  const addToFavorites = async (hostelId) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        // Fetch the hostel data from Firestore
        const hostelRef = doc(firestore, 'hostels', hostelId);
        const hostelDoc = await getDoc(hostelRef);

        if (!hostelDoc.exists()) {
          console.log('Hostel does not exist');
          return;
        }

        const hostelData = hostelDoc.data();

        const userRef = doc(firestore, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          // If the user document does not exist, create it with an empty favorites array
          await setDoc(userRef, { favorites: [] });
        }

        // Now update the favorites array with the full hostel object
        await updateDoc(userRef, {
          favorites: arrayUnion({
            id: hostelId,
            ...hostelData,
          }),
        });

        alert(`Hostel "${hostelData.name}" added to favorites`);
      } catch (error) {
        console.error('Error adding to favorites: ', error);
      }
    } else {
      console.log('User not logged in');
    }
  };

  return (
    <div
      className="text-white text-3xl text-center cursor-pointer hover:underline capitalize relative"
      onClick={() => addToFavorites(id)}
    >
    <CiHeart className='text-3xl' />
    </div>
  );
}

export default AddToFavorites;
