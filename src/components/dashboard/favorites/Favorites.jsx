import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import CardSliderless from '../../common/CardSliderless';
import { firestore } from '../../../firebase/Firebase';

const FavoriteHostels = () => {
  const [favoriteHostels, setFavoriteHostels] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setFavoriteHostels(userDoc.data().favorites || []);
        }
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="container mx-auto my-10 min-h-screen dark:text-text">
      <h1 className="text-xl max-sm:text-center mdLtext-2xl font-bold mb-4 italic py-3">Your Favourite Hostels</h1>
    <div className='flex justify-around items-cente flex-wrap '>
    {favoriteHostels.length > 0 ? (
        <div className="flex flex-wrap justify-between items-center ">       
          {
            <CardSliderless hostels={favoriteHostels}/>
          }
        </div>
      ) : (
        <p className='max-sm:text-lg text-justify px-3'>You haven't added any hostels to favorites yet.</p>
      )}
    </div>
    </div>
  );
};

export default FavoriteHostels;
