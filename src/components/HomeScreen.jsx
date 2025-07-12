import logo from '../assets/logo.png';
import name from '../assets/URBANCAMINO.svg';
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
        <img src={logo} alt="Urban Camino Logo" className={styles.shell}/>
        <img src={name} alt="Urban Camino" />
        {/* <h1 className={styles.name}>URBAN CAMINO</h1> */}
      </div>

      <button
        className={styles.button}
        onClick={onNext}
      >
        FIND ROUTE
      </button>
{/* 
      <div className={styles.bottompanel}>
        bottom panel
      </div> */}
    </div>
  );
}

export default HomeScreen;