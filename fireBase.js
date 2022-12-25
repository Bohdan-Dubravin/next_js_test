// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyC5z4W5QtxwSXnmQD78MRX3aNx_xe6KRPE',
  authDomain: 'insta-2-a6ba7.firebaseapp.com',
  projectId: 'insta-2-a6ba7',
  storageBucket: 'insta-2-a6ba7.appspot.com',
  messagingSenderId: '567657318892',
  appId: '1:567657318892:web:9ba650ad96d126b20518c9',
  measurementId: 'G-95DZQXBE3W',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage(app);

export { app, db, storage };
// const analytics = getAnalytics(app);
