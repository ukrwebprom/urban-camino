import { useState, useEffect } from 'react';
import styles from './UserOverlay.module.css';
import closeIcon from '../assets/close.svg';
import userIcon from '../assets/unknownuser.svg';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';


function UserOverlay ({onClose}) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    //onSubmit({ email, password });
    if(isLogin) loginUser(email, password);
    else registerUser(email, password);
    };

    function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Зарегистрирован:', user);
      // здесь можно сохранить пользователя в базе или перенаправить
    })
    .catch((error) => {
      console.error('Ошибка регистрации:', error.message);
      setError(error.message);
    });
    }

    function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Успешный вход:', user);
      onClose();
      // здесь можешь сохранить user.uid, перейти на другой экран и т.д.
    })
    .catch((error) => {
      console.error('Ошибка входа:', error.message);
      setError(error.message);
    });
    }

    function resetPassword(email) {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log('Письмо с восстановлением отправлено');
      setError(null);
      setMessage('Письмо с восстановлением пароля отправлено на указанный email');
    })
    .catch((error) => {
      console.error('Ошибка при восстановлении пароля:', error.message);
      setError(error.message);
    });
    }

    useEffect(() => {
        setError(null);
    }, [email, password])
    return (
        <div className={styles.main}>
            <img src={userIcon} />
            <p className={styles.loginTitle}>Your path matters</p>
            <p className={styles.loginDescription}>Create an account to save your walking history, keep your shells, and receive beautiful Camino certificates.</p>
            <ul className={styles.modeSwitcher}>
                <li className = {isLogin ? styles.activeItem: ''} onClick={() => setIsLogin(true)}>Log In</li>
                <li className = {!isLogin ? styles.activeItem: ''} onClick={() => setIsLogin(false)}>Create account</li>
            </ul>

            <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">{isLogin ? 'Log In': 'Create account'}</button>
            </form>

            <p className={styles.forgot} onClick={() => resetPassword(email)}>Forgot password?</p>
            {error && <div className={styles.errorPanel}>
                <p>{error}</p>
            </div>}
            {message && <div className={styles.messagePanel}>
                <p>{message}</p>
            </div>}
            
            <img src={closeIcon} className={styles.closeBtn} onClick={onClose} />
        </div>
    )
        
}

export default UserOverlay