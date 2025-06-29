import styles from './TopPanel.module.css';
import logo from '../assets/logo.png';

function TopPanel() {
    return (
        <div className={styles.topPanel}>
              <h1 className={styles.topPanelTitle}>Routes</h1>
              <img src={logo} alt="Urban Camino Logo" className={styles.logo} />
        </div>
    )
}

export default TopPanel;