import logo from '../assets/logo.png';
import bgVideo from '../assets/bg.mp4';
import styles from './HomeScreen.module.css';
function HomeScreen({ onNext }) {
  return (
    <div className={styles.container}>
      <video
        className={styles.videoBg}
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Центр: логотип и название */}
      <div className={styles.logo}>
        <img src={logo} alt="Urban Camino Logo" className="w-20 h-20" />
        <h1 className={styles.name}>URBAN CAMINO</h1>
      </div>

      <button
        className={styles.button}
        onClick={onNext}
      >
        FIND ROUT
      </button>
{/* 
      <div className={styles.bottompanel}>
        bottom panel
      </div> */}
    </div>
  );
}

export default HomeScreen;