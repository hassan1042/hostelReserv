import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBIlrd2wiITYv9k6r8ssEL26uMgxn_Tj9g",
  authDomain: "hostelreserv-6029f.firebaseapp.com",
  projectId: "hostelreserv-6029f",
  storageBucket: "hostelreserv-6029f.appspot.com",
  messagingSenderId: "242858491052",
  appId: "1:242858491052:web:7e92034e5a46b1101eb309"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };