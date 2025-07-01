import styles from './ReadyToStartLabel.module.css';
import shell from '../assets/logo-inyellow.png';

function ReadyToStartLabel({handleStart}) {
    return (
        <div className={styles.main}>
            <img src={shell} className={styles.shell}/>
            <div className={styles.labelContent}>
                <h4>You're at the start. </h4>
                <p>Ready to begin your journey?</p>
                <button onClick={() => handleStart()}>Start the journey</button>
            </div>
        </div>
    )
}

export default ReadyToStartLabel;