import styles from './ControlPanel.module.css';

function ControlPanel({ showInstall, onInstallClick }) {
    return (
      <div className={styles.panel}>
        <button className={styles.button}>Начать путь</button>
        <button className={styles.button}>Завершить</button>
        {showInstall && (
        <button onClick={onInstallClick}>
          Установить приложение
        </button>
      )}
      </div>
    );
  }
  
  export default ControlPanel;