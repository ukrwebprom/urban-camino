import logo from '../assets/logo.png';
import name from '../assets/URBANCAMINO.svg';
import bgVideo from '../assets/bg.mp4';
import styles from './HomeScreen.module.css';
import TopPanel from './TopPanel';
import { useTranslation } from 'react-i18next';
//import { useAuth } from '../hooks/useAuth';
import { useAuth } from '../AuthProvider';
//import AuthForm from '../hooks/AuthForm';

function HomeScreen({ onNext }) {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  //const { user, handleLogin, handleLogout, handleGoogleSignInRedirect } = useAuth();

  return (
    <div className={styles.container}>
      <TopPanel mode={'home'} user={user} />
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

        <button className={styles.button} onClick={onNext}>
          {t('find-route')}
        </button>
      </div>
      {/* <div className={styles.logSign}>
        <AuthForm />
      </div> */}
    </div>
  );
}

export default HomeScreen;