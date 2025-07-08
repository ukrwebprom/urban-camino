import styles from './EnterNameForm.module.css';
import shell from '../assets/logo-inyellow.png';

function EnterNameForm({handleEnterName}) {
    return (
        <div className={styles.main}>
            <img src={shell} className={styles.shell}/>
            <div className={styles.labelContent}>
                <h4>Маршрут пройден!</h4>
                <p>теперь это часть твоей истории.</p>
                <p>Введи свое имя и получи электронный сертификат о прохождении маршрута</p>
                <button onClick={() => handleEnterName('Толик')}>Получить сертификат</button>
            </div>
        </div>
    )
}

export default EnterNameForm;