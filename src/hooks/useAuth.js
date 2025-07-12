import { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
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

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
      setUser(userData);
      console.log(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  // Синхронизация при обновлении страницы
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        };
        setUser(userData);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return { user, handleLogin, handleLogout };
}
