import styles from './MoveToStartLabel.module.css';
import flag from '../assets/flag.png';
import move from '../assets/moveIcon.svg';
import { useTranslation } from 'react-i18next';

function MoveToStartLabel({addr}) {
    const { t } = useTranslation();
    return (
        <div className={styles.main}>
            <img src={move} width={45}/>
            <div className={styles.labelInfo}>
                <h4>{t('MoveToStart')}</h4>
                <p>{addr}</p>
            </div>
            
        </div>
    )
}

export default MoveToStartLabel;