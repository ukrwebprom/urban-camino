import styles from './EnterNameForm.module.css';
import shell from '../assets/logo-inyellow.png';
import { useEffect, useState } from 'react'

function EnterNameForm({handleEnterName, routeName}) {
    const [name, setName] = useState('');
    return (
        <div className={styles.main}>
            <img src={shell} className={styles.shell}/>
            <div className={styles.labelContent}>
                <h4>Маршрут пройден!</h4>
                <p>теперь это часть твоей истории.</p>
                <p>Введи свое имя и получи электронный сертификат о прохождении маршрута</p>
                <p className={styles.routeName}>{routeName}</p>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={() => handleEnterName(name)}>Получить сертификат</button>
            </div>
        </div>
    )
}

export default EnterNameForm;