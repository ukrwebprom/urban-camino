import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // твой файл инициализации
import  {createUser} from './api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      console.log('user status changed');
      if(firebaseUser) {
        try {
          const response = await createUser(firebaseUser);
          console.log('response', response);
          setPoints(response.achievements.points);
        } catch (error) {
          console.error('Ошибка при получении данных пользователя:', error);
        }} else {
          setPoints(null);
        }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, points, setPoints }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для удобного доступа
export const useAuth = () => useContext(AuthContext);