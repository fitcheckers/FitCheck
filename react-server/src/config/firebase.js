// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSal0IsBhwXJI-6u8LbPPgR_KLCwMIM6U",
  authDomain: "fitcheck-b023b.firebaseapp.com",
  projectId: "fitcheck-b023b",
  storageBucket: "fitcheck-b023b.appspot.com",
  messagingSenderId: "13443459137",
  appId: "1:13443459137:web:ebb9bd5bc9c13c77683ec0",
  measurementId: "G-G647WKTTM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
export {auth, storage};