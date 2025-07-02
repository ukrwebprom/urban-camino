import styles from './TrackingUI.module.css';
function TrackingUI () {
    return (
        <>
            <div className={styles.trackingLabel}>
                <p>tracking</p>
            </div>
            <div className={styles.speedOmeter}>
                <p>10<span>km/h</span></p>
            </div>
        </>
    )   
}

export default TrackingUI;