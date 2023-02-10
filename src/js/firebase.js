// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkZtkvtCMpzprB5STHD1XaWNmsACEqUxg",
  authDomain: "calificaciones-19098.firebaseapp.com",
  projectId: "calificaciones-19098",
  storageBucket: "calificaciones-19098.appspot.com",
  messagingSenderId: "372828106983",
  appId: "1:372828106983:web:4a88b9eb99d6e08c0cf242",
  measurementId: "G-MM99RXR1M9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//Auth
export const auth = getAuth(app);

// Initialize Firebase
const analytics = getAnalytics(app);