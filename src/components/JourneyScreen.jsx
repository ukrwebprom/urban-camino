import { useEffect, useState } from 'react';
import MapView from './MapView';
import routeMap from '../routes';
import getDistance from '../utils/getDistance';

function JourneyScreen({routeId, onComplete }) {
  const [phase, setPhase] = useState('beforeStart'); // 'beforeStart' | 'readyToStart' | 'tracking'
  const [position, setPosition] = useState(null);
  const route = routeMap[routeId];  // routeId === 'padawan'

  const startPoint = route.checkPoints[0].geometry.coordinates;

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);

        const dist = getDistance(coords, [startPoint[1], startPoint[0]]); // [lat, lng]

        if (phase === 'beforeStart' && dist < 30) {
          setPhase('readyToStart');
        }
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [phase, startPoint]);

  const handleStart = () => setPhase('tracking');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{route.name}</h2>
      {phase === 'beforeStart' && <p>Доберитесь до стартовой точки</p>}

      {phase === 'readyToStart' && (
        <div>
          <p>Вы на старте. Готовы начать путь?</p>
          <button onClick={handleStart}>Начать путь</button>
        </div>
      )}

      {phase === 'tracking' && (
        <MapView route={route} userPosition={position} onFinish={onComplete} />
      )}      
    </div>
  );
}

export default JourneyScreen;