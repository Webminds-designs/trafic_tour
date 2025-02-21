// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-2lZBk8HQJpSMQtH8kt0Kiak9Ja7zM_s",
  authDomain: "clone-71838.firebaseapp.com",
  projectId: "clone-71838",
  storageBucket: "clone-71838.appspot.com",
  messagingSenderId: "559163301929",
  appId: "1:559163301929:web:c0b9f34c0a7442fdcfbc38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const auth=getAuth(app);

export {auth};