import styles from './TrackingUI.module.css';
function TrackingUI () {
    return (
        <div className={styles.main}>
            <div className={styles.trackingLabel}>
                <p>tracking</p>
            </div>
            <div>
                <p>Speed</p>
            </div>
        </div>
    )   
}

export default TrackingUI;