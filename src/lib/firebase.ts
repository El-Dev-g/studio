// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "skyhost-z740f",
  "appId": "1:239758760959:web:90010286d9cc2783a865ca",
  "storageBucket": "skyhost-z740f.firebasestorage.app",
  "apiKey": "AIzaSyDi8iiptVqGFhc0bTfoXUOiSjDXSUUfico",
  "authDomain": "skyhost-z740f.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "239758760959"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
