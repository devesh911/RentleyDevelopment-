// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyB6NlNTtK_zxA3pkuebC4oFLU20datVURw",
  authDomain: "react-cicd-production.firebaseapp.com",
  projectId: "react-cicd-production",
  storageBucket: "react-cicd-production.appspot.com",
  messagingSenderId: "328039130283",
  appId: "1:328039130283:web:18a9d06c6283f7c77803ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app) 
export const messaging = getMessaging(app);
