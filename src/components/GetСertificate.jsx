import styles from './ReadyToStartLabel.module.css';
import shell from '../assets/logo-inyellow.png';

function GetСertificate({userName, routeName, distance}) {
    return (
        <div className={styles.main}>
            <p>{userName}</p>
            <p>{routeName}</p>
            <p>{distance}</p>
        </div>
    )
}

export default GetСertificate;