import { useEffect } from 'react';
import { getAuth, signInWithPopup, signInWithRedirect, getRedirectResult, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { usePersistentState } from './usePersistentState'; // твой собственный хук
import { initializeApp } from 'firebase/app';

// Firebase config (замени на свои данные)
const firebaseConfig = {
  apiKey: "AIzaSyDVnU2xYm1baZYomNPmX7ph58m7_qhmSps",
  authDomain: "urban-camino.firebaseapp.com",
  projectId: "urban-camino",
  storageBucket: "urban-camino.firebasestorage.app",
  messagingSenderId: "761376237323",
  appId: "1:761376237323:web:f17891bdf8e2c64e6f640e",
  measurementId: "G-DYVVYKTL5G"
};

// Инициализируем Firebase (если еще не инициализирован)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function useAuth() {
  const [user, setUser] = usePersistentState('user', null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
    console.log('auth', auth);
    // Обработка результата после редиректа
    getRedirectResult(auth)
      .then((result) => {
        console.log('result', result);
        if (result?.user) {
          if(!user) setUser(result.user);
          console.log(result.user);
        }
      })
      .catch((error) => {
        console.error('Ошибка входа через редирект:', error);
      });

    return () => unsubscribe();
  }, []);

  // const handleLogin = () => {
  //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  //   if (isMobile) {
  //     console.log('mobile');
  //     signInWithRedirect(auth, provider);
  //   } else {
  //     console.log('desktop');
  //     signInWithPopup(auth, provider)
  //       .then((result) => {
  //         if (result.user) {
  //           setUser(result.user);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Ошибка входа:', error);
  //       });
  //   }
  // };

  const handleGoogleSignInRedirect = async () => {
    const provider = new GoogleAuthProvider();
    try {
      // This will redirect the user to Google's sign-in page.
      // Your app will be reloaded after the redirect.
      console.log('open auth window');
      await signInWithRedirect(auth, provider);
      
      // No code here will run immediately after the redirect.
      // The result is handled by getRedirectResult on page load.
    } catch (error) {
      // Handle errors during the initial redirect attempt (less common)
      console.error("Error initiating Google Sign-In redirect:", error);
      // You might display an error message to the user here.
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  return { user, handleLogout, handleGoogleSignInRedirect };
}
