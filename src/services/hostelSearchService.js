import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/Firebase';

// Function to fetch hostels from Firestore
export const fetchHostels = async (searchTerm, filterType) => {
  const hostels = [];
  let q = collection(firestore, 'hostels');
  if(searchTerm){
   searchTerm = searchTerm.toLowerCase();
  //  searchTerm = searchTerm[0].toUpperCase() + searchTerm.substring(1);
  };

  if (filterType === 'name' && searchTerm) {
    q = query(q, 
      where('name', '>=', searchTerm), 
      where('name', '<=', searchTerm + '\uf8ff')
    );
  } else if (filterType === 'beds' && searchTerm) {
    q = query(q, 
      where('beds', '==', searchTerm)
    );
  } else if (filterType === 'address' && searchTerm) {
    q = query(q, 
      where('location', '>=', searchTerm), 
      where('location', '<=', searchTerm + '\uf8ff')
    );
  }

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      hostels.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error fetching hostels: ", error);
  }

  return hostels;
};
