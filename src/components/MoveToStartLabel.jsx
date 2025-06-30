import styles from './MoveToStartLabel.module.css';
import flag from '../assets/flag.png';

function MoveToStartLabel({addr}) {
    return (
        <div className={styles.main}>
            <img src={flag} width={33}/>
            <div className={styles.labelInfo}>
                <h4>Move to the starting point</h4>
                <p>{addr}</p>
            </div>
            
        </div>
    )
}

export default MoveToStartLabel;