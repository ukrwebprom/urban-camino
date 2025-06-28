import routeMap from '../routes';
import RouteSketch from '../utils/RouteSketch';
import styles from './RouteSelectScreen.module.css';

console.log(routeMap);
function RouteSelectScreen({ onSelect, onBack }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Выберите маршрут</h2>
        {
            routeMap.map((route) => (
                <div key={route.id} className={styles.routeCard}>
                    <h3 className={styles.title}>{route.name}</h3>
                    <p className={styles.description}>{route.description}</p>
                    <p>Длина: {route.distance} км</p>
                    <RouteSketch 
                    route = {
                      route.coordinates
                    }
                    checkpoints={
                      route.checkPoints.map((point) => (point.coordinates))
                    } />

                    <button onClick={() => onSelect(route.id)}>Выбрать</button>
                </div>
            ))
        }
      <button onClick={onBack}>back</button>
    </div>
  );
}

export default RouteSelectScreen;