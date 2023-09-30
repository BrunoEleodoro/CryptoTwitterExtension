import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTkoEVODuJ_fjSIbY0xvPLcejg9FLGlOE",
  authDomain: "crypto-twitter-ecc23.firebaseapp.com",
  projectId: "crypto-twitter-ecc23",
  storageBucket: "crypto-twitter-ecc23.appspot.com",
  messagingSenderId: "744914284284",
  appId: "1:744914284284:web:47bc5abac9a091e095f179",
  measurementId: "G-866L5VEVHT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
