import styles from './ReadyToStartLabel.module.css';
import shell from '../assets/logo-inyellow.png';
import { useTranslation } from 'react-i18next';

function ReadyToStartLabel({handleStart}) {
    const { t } = useTranslation();
    return (
        <div className={styles.main}>
            <img src={shell} className={styles.shell}/>
            <div className={styles.labelContent}>
                <h4>{t('ReadyTitle')}</h4>
                <p>{t('ReadyQuestion')}</p>
                <button onClick={() => handleStart()}>{t('ReadyButton')}</button>
            </div>
        </div>
    )
}

export default ReadyToStartLabel;