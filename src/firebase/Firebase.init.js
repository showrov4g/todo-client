// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5QqBDFAxUJt_tXIGE6DQ5yat9dAuPCYo",
  authDomain: "task-management-af981.firebaseapp.com",
  projectId: "task-management-af981",
  storageBucket: "task-management-af981.firebasestorage.app",
  messagingSenderId: "250466800716",
  appId: "1:250466800716:web:cee56eef32e6ca514710e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);