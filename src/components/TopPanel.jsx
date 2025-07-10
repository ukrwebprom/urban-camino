import styles from './TopPanel.module.css';
import PointsDisplay from './PointsDisplay';
//import logo from '../assets/logo.png';

function TopPanel({points=0, title}) {
    return (
        <div className={styles.topPanel}>
              <h1 className={styles.topPanelTitle}>{title}</h1>
              <PointsDisplay points={points} />
              {/* <img src={logo} alt="Urban Camino Logo" className={styles.logo} /> */}
        </div>
    )
}

export default TopPanel;