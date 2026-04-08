// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnjFIdJU69acX1q2LAsgfO7dSIU7xtwFs",
  authDomain: "first-firebase-auth-d2cc9.firebaseapp.com",
  projectId: "first-firebase-auth-d2cc9",
  storageBucket: "first-firebase-auth-d2cc9.firebasestorage.app",
  messagingSenderId: "776322952622",
  appId: "1:776322952622:web:0a2378220ab3e5e838ac3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
