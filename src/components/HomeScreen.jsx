import logo from '../assets/logo.png';
import styles from './HomeScreen.module.css';
function HomeScreen({ onNext }) {
  return (
    <div className={styles.container}>
      {/* Центр: логотип и название */}
      <div className={styles.logo}>
        <img src={logo} alt="Urban Camino Logo" className="w-20 h-20" />
        <h1 className={styles.name}>URBAN CAMINO</h1>
      </div>

      {/* Кнопка внизу */}
      <button
        className={styles.button}
        onClick={onNext}
      >
        FIND ROUT
      </button>
    </div>
  );
}

export default HomeScreen;