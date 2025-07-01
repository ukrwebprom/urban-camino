import styles from './FinishScreen.module.css';
function FinishScreen({ onNext }) {
  return (
    <div className={styles.main}>
      <h1>Finish</h1>
      <p>Прогулки по городу как путь паломника.</p>
      <button onClick={onNext}>Начать</button>
    </div>
  );
}

export default FinishScreen;