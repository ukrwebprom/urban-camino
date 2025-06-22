const routes = [
    {
        id: 'padawan',
        name: 'Camino del Padawan',
        description: 'Короткий маршрут для первого шага.',
        distance: 1
    },
    {
    id: 'tavria',
    name: 'Camino del Tavria',
    description: 'Дорога в Таврию В',
    distance: 0.34
    }
]
function RouteSelectScreen({ onSelect, onBack }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Выберите маршрут</h2>
        {
            routes.map((route) => (
                <div key={route.id} style={{ marginBottom: '1.5rem' }}>
                    <h3>{route.name}</h3>
                    <p>{route.description}</p>
                    <p>Длина: {route.distance} км</p>
                    <button onClick={() => onSelect(route.id)}>Выбрать</button>
                </div>
            ))
        }
      <button onClick={onBack}>back</button>
    </div>
  );
}

export default RouteSelectScreen;