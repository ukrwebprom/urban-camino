import logo from '../assets/logo.png';
import name from '../assets/URBANCAMINO.svg';
import bgVideo from '../assets/bg.mp4';
import styles from './HomeScreen.module.css';
import TopPanel from './TopPanel';
import { useTranslation } from 'react-i18next';

function HomeScreen({ onNext }) {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <TopPanel mode={'home'} />
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
        {t('find-route')}
      </button>
{/* 
      <div className={styles.bottompanel}>
        bottom panel
      </div> */}
    </div>
  );
}

export default HomeScreen;