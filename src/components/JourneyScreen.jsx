import { useEffect, useState } from 'react';
import MapView from './MapView';
import routeMap from '../routes';
import getDistance from '../utils/getDistance';

function JourneyScreen({routeId, onComplete, onBack }) {
  const [phase, setPhase] = useState('beforeStart'); // 'beforeStart' | 'readyToStart' | 'tracking'
  const [position, setPosition] = useState(null);
  const [passedIds, setPassedIds] = useState([]);
  console.log('routeId:', routeId);

  const route = routeMap[routeId];
  const startPoint = route.checkPoints[0].geometry.coordinates;
  console.log('route:', route);
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);

        handlePhaseLogic(phase, coords);
      },
      (err) => console.error('Geo error:', err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [phase, passedIds]);

 function handlePhaseLogic(currentPhase, coords) {
    switch (currentPhase) {
      case 'beforeStart':
        checkArrivalAtStart(coords);
        break;
      case 'tracking':
        checkPassedCheckpoints(coords);
        break;
      default:
        break;
    }
  }


  function checkArrivalAtStart(coords) {
    const [startLng, startLat] = route.geoJson.features[0].geometry.coordinates[0];
    const distance = getDistance(coords, [startLat, startLng]);

    if (distance < 30) {
      setPhase('readyToStart');
    }
  }

  function checkPassedCheckpoints(coords) {
    route.checkPoints.forEach((point) => {
      const id = point.properties.id;
      if (passedIds.includes(id)) return;

      const [lng, lat] = point.geometry.coordinates;
      const dist = getDistance(coords, [lat, lng]);

      if (dist < 30) {
        setPassedIds(prev => [...prev, id]);
      }
    });
  }

  useEffect(() => {
    if (
      phase === 'tracking' &&
      passedIds.length === route.checkPoints.length
    ) {
      onComplete();
    }
  }, [passedIds, route, phase, onComplete]);

  const handleStart = () => setPhase('tracking');

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{route.name}</h2>
      <p>Расстояние {route.distance}km</p>
      <button onClick={onBack}>Back</button>
      {phase === 'beforeStart' && (
      <>
        <p>Доберитесь до стартовой точки</p>
        <MapView
        route={route}
        userPosition={position}
        startPoint={startPoint}
        />
      </>
      )}

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