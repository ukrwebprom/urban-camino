import { useState, useEffect } from 'react';

function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    try {
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error('Ошибка парсинга из localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState;
