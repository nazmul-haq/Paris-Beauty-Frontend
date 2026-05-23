// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBnITMQVfvDU4yxsq7OHL-rvsH2w4gKnZM",
  authDomain: "paris-beauty-bd.firebaseapp.com",
  projectId: "paris-beauty-bd",
  storageBucket: "paris-beauty-bd.firebasestorage.app",
  messagingSenderId: "1082513096553",
  appId: "1:1082513096553:web:c3cd7c42dad10f7251c7f8",
  measurementId: "G-8FKM8RJKTQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export default auth;

