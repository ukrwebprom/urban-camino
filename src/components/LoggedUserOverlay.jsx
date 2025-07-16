import styles from './LoggedUserOverlay.module.css';
import closeIcon from '../assets/close.svg';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";

function LoggedUserOverlay ({onClose}) {

    function logout() {
    signOut(auth)
    .then(() => {
      console.log('Пользователь вышел из системы');
      setMessage('Пользователь вышел из системы');
      onClose();
    })
    .catch((error) => {
      console.error('Ошибка при выходе:', error.message);
      setError(error.message);
    });
    }

    return(
        <div className={styles.main}>
            <p onClick={() => logout()}>Log out</p>
            <img src={closeIcon} className={styles.closeBtn} onClick={onClose} />
        </div>
    )
}

export default LoggedUserOverlay;