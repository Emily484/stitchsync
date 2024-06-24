import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDBvRQSTkxTv3RkWUyFSr5pUcvVStjhKEo",
  authDomain: "stitchsync-551ec.firebaseapp.com",
  projectId: "stitchsync-551ec",
  storageBucket: "stitchsync-551ec.appspot.com",
  messagingSenderId: "509364225849",
  appId: "1:509364225849:web:ddfb6d532586f724600ae8",
  measurementId: "G-M3C7LCMB8F"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
