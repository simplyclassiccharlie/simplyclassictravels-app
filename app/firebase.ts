// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjZ34bVYG9lWLdmk1C1yOOJwXRhzD42T8",
  authDomain: "simplyclassictravelsbooking.firebaseapp.com",
  projectId: "simplyclassictravelsbooking",
  storageBucket: "simplyclassictravelsbooking.firebasestorage.app",
  messagingSenderId: "884329561983",
  appId: "1:884329561983:web:35f7c487b585a799bbe44a",
  measurementId: "G-EQTYMGCHQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
