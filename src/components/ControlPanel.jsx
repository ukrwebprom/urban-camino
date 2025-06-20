import styles from './ControlPanel.module.css';

function ControlPanel() {
    return (
      <div className={styles.panel}>
        <button className={styles.button}>Начать путь</button>
        <button className={styles.button}>Завершить</button>
      </div>
    );
  }
  
  export default ControlPanel;