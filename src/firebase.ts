import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDDUJ5W-jpW4uSmYm22H7G9iAXiSr8BFPw",
  authDomain: "tm-kasaty.firebaseapp.com",
  projectId: "tm-kasaty",
  storageBucket: "tm-kasaty.firebasestorage.app",
  messagingSenderId: "758897474612",
  appId: "1:758897474612:web:46d31e38c131d660d65e61",
  measurementId: "G-55LC4EWXYV"
};

// Initialize Firebase only once
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
