import styles from './UserOverlay.module.css';
import closeIcon from '../assets/close.svg';
import { useState } from 'react';
import userIcon from '../assets/unknownuser.svg';

function UserOverlay ({onClose}) {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className={styles.main}>
            <img src={userIcon} />
            <p className={styles.loginDescription}>Your path matters. Log in to save your steps and earn your rewards.</p>
            <ul className={styles.modeSwitcher}>
                <li className = {isLogin ? styles.activeItem: ''} onClick={() => setIsLogin(true)}>Log In</li>
                <li className = {!isLogin ? styles.activeItem: ''} onClick={() => setIsLogin(false)}>Create account</li>
            </ul>
            <img src={closeIcon} className={styles.closeBtn} onClick={onClose} />
            <p>Overlay</p>
        </div>
    )
        
}

export default UserOverlay