// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRE2u4nK3MdzIf2x7SiBxMBIqeM41OK_U",
  authDomain: "todo-task-4d852.firebaseapp.com",
  projectId: "todo-task-4d852",
  storageBucket: "todo-task-4d852.firebasestorage.app",
  messagingSenderId: "1068132881170",
  appId: "1:1068132881170:web:01a39f18ee3034802ed9cb",
  measurementId: "G-VWCBL2C0ER"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);