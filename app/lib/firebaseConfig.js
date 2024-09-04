// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyB14P-5LEBP12XoFd_ZRzfTqf5QHNNBLAg',
  authDomain: `blog-platform-6c30c.firebaseapp.com`,
  projectId: 'blog-platform-6c30c',
  storageBucket: `blog-platform-6c30c.appspot.com`,
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);