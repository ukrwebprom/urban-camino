import styles from './TopPanel.module.css';
import PointsDisplay from './PointsDisplay';
import dots from '../assets/dots.svg';
import backArrow from '../assets/back-arrow.svg';

function TopPanel({showPoints, showBack, onBack, points=0, title}) {
    return (
        <div className={styles.topPanel}>
              {showBack && <img src={backArrow} className={styles.backArrow} onClick={onBack} />}
              <h1 className={styles.topPanelTitle}>{title}</h1>
              {showPoints && <PointsDisplay points={points} />}
              <img src={dots} />
              {/* <img src={logo} alt="Urban Camino Logo" className={styles.logo} /> */}
        </div>
    )
}

export default TopPanel;