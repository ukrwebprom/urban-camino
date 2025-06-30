import { useEffect, useState } from 'react';
import MapView from './MapView';
import routeMap from '../routes';
import getDistance from '../utils/getDistance';
import styles from './JourneyScreen.module.css';
import TopPanel from './TopPanel';

function JourneyScreen({routeId, onComplete, onBack }) {
  const [phase, setPhase] = useState('readyToStart'); // 'beforeStart' | 'readyToStart' | 'tracking'
  const [position, setPosition] = useState(null);
  const [passedIds, setPassedIds] = useState([]);

  const route = routeMap.find((route) => route.id === routeId);
  const startPoint = [route.checkPoints[0].coordinates[1], route.checkPoints[0].coordinates[0]] ;


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
    const distance = getDistance(coords, startPoint);

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
    <>
    <TopPanel title={route.name} />
    <div className={styles.container}>
      {/* <h2>{route.name}</h2>
      <p>Расстояние {route.distance}km</p>
      <button onClick={onBack}>Back</button> */}
      <MapView
        route={route}
        userPosition={position}
        startPoint={startPoint}
        phase={phase}
        passedIds={passedIds}
      />
      {phase === 'beforeStart' && (
        <div className={styles.uiOverlay}>
          <h2>Двигайтесь к стартовой точке</h2>
          <p>Осталось 120 м</p>
        </div>
      )}

      {phase === 'readyToStart' && (
        <div>
          <p>Вы на старте. Готовы начать путь?</p>
          <button onClick={handleStart}>Начать путь</button>
        </div>
      )}

      {phase === 'tracking' && (
        <div>
        <p>Вы на старте. Готовы начать путь?</p>
        <button onClick={handleStart}>Начать путь</button>
      </div>
        // <MapView route={route} userPosition={position} onFinish={onComplete} />
      )}      
    </div>
    </>
  );
}

export default JourneyScreen;