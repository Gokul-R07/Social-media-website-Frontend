// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIaB_dCh522pk1_BWts41OawP_pozocLs",
  authDomain: "social-media-spectrum.firebaseapp.com",
  projectId: "social-media-spectrum",
  storageBucket: "social-media-spectrum.appspot.com",
  messagingSenderId: "771089704140",
  appId: "1:771089704140:web:dc797f05c58f8fc3b54e69",
  measurementId: "G-BHVJEB7X4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
