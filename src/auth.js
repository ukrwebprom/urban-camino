// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVnU2xYm1baZYomNPmX7ph58m7_qhmSps",
  authDomain: "urban-camino.firebaseapp.com",
  projectId: "urban-camino",
  storageBucket: "urban-camino.firebasestorage.app",
  messagingSenderId: "761376237323",
  appId: "1:761376237323:web:f17891bdf8e2c64e6f640e",
  measurementId: "G-DYVVYKTL5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };