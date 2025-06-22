function FinishScreen({ onNext }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Finish</h1>
      <p>Прогулки по городу как путь паломника.</p>
      <button onClick={onNext}>Начать</button>
    </div>
  );
}

export default FinishScreen;