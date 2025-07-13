import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication services

// Your web app's Firebase configuration
// You need to get these values from your Firebase Project Settings in the Firebase Console.
const firebaseConfig = {
  apiKey: "AIzaSyDVnU2xYm1baZYomNPmX7ph58m7_qhmSps",
  authDomain: "urban-camino.firebaseapp.com",
  projectId: "urban-camino",
  storageBucket: "urban-camino.firebasestorage.app",
  messagingSenderId: "761376237323",
  appId: "1:761376237323:web:f17891bdf8e2c64e6f640e",
  measurementId: "G-DYVVYKTL5G"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Export the auth instance so you can use it throughout your app
export { auth };