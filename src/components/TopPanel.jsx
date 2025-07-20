import styles from './TopPanel.module.css';
import PointsDisplay from './PointsDisplay';
import dots from '../assets/dots.svg';
import backArrow from '../assets/back-arrow.svg';
import userIcon from '../assets/user.svg';
import LanguageSelector from './LanguageSelector';
import { useState } from 'react';
import UserOverlay from './UserOverlay';
import LoggedUserOverlay from './LoggedUserOverlay'
import { useAuth } from '../AuthProvider';

function TopPanel({mode, onBack, points=0, title}) {
    const [showOverlay, setShowOverlay] = useState(false);
    const { user, loading } = useAuth();
    return (
        <>
        <div className={styles.topPanel}
            style={{backgroundColor: mode==="home" ? 'transparent' : 'rgba(0,0,0,0.8)'} }
        >     {mode === 'home' && <LanguageSelector />}
              {mode !=="home" && <img src={backArrow} className={styles.backArrow} onClick={onBack} />}
              {mode !=="home" && <h1 className={styles.topPanelTitle}>{title}</h1>}
              {mode === 'tracking' && <PointsDisplay points={points} />}
              <img src={(user && user.photoURL) ? user.photoURL : userIcon} onClick={() => setShowOverlay(true)} className={styles.userPic}/>
              {/* <img src={logo} alt="Urban Camino Logo" className={styles.logo} /> */}
        </div>
        {showOverlay && (user ?
            <LoggedUserOverlay onClose={() => setShowOverlay(false)} user={user} /> :
            <UserOverlay onClose={() => setShowOverlay(false)} />)
            
        }
        </>
    )
}

export default TopPanel;