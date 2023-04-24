// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG8ucj2DzYGbJMAwjAb8n8w_1d3VIoS5M",
  authDomain: "send-to-kindle-a2e98.firebaseapp.com",
  projectId: "send-to-kindle-a2e98",
  storageBucket: "send-to-kindle-a2e98.appspot.com",
  messagingSenderId: "223933214837",
  appId: "1:223933214837:web:2f9c259536da1aa435483c",
  measurementId: "G-MJFSL3YSKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };