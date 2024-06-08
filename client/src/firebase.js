// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-87a63.firebaseapp.com",
  projectId: "realestate-87a63",
  storageBucket: "realestate-87a63.appspot.com",
  messagingSenderId: "962750480271",
  appId: "1:962750480271:web:5f404bc4cf3658270d15fa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
