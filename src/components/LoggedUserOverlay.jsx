import styles from './LoggedUserOverlay.module.css';
import closeIcon from '../assets/close.svg';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";
import {showAllUsers, showUserByUid} from '../api/api';

function LoggedUserOverlay ({onClose, user}) {

    function logout() {
    signOut(auth)
    .then(() => {
      console.log('Пользователь вышел из системы');
      onClose();
    })
    .catch((error) => {
      console.error('Ошибка при выходе:', error.message);
    });
    }

    async function showUsers() {
      console.log('SHOW USERS');
      const users = await showAllUsers();
      console.log(users);
    }

    async function showUserData() {
      console.log('SHOW USER DATA', user.uid);
      const data = await showUserByUid(user.uid);
      console.log(data);
    }

    return(
        <div className={styles.main}>
            <p onClick={() => showUsers()}>Show all users</p>
            <p onClick={() => showUserData()}>Show user data</p>
            <p>delete user</p>
            <p onClick={() => logout()}>Log out</p>
            <img src={closeIcon} className={styles.closeBtn} onClick={onClose} />
        </div>
    )
}

export default LoggedUserOverlay;