import { useEffect, useState } from 'react';
import MapView from './MapView';
import routeMap from '../routes';
import getDistance from '../utils/getDistance';
import styles from './JourneyScreen.module.css';
import TopPanel from './TopPanel';
import MoveToStartLabel from './MoveToStartLabel';
import ReadyToStartLabel from './ReadyToStartLabel';
import SpeedMarker from './SpeedMarker';

function JourneyScreen({routeId, onComplete, onBack }) {
  const [phase, setPhase] = useState('tracking'); // 'beforeStart' | 'readyToStart' | 'tracking'
  const [position, setPosition] = useState(null);
  const [passedIds, setPassedIds] = useState([]);
  const [speed, setSpeed] = useState(null);

  const route = routeMap.find((route) => route.id === routeId);
  const startPoint = [route.checkPoints[0].coordinates[1], route.checkPoints[0].coordinates[0]] ;


  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setPosition(coords);
        const speed = pos.coords.speed;
        setSpeed(speed);
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
      const id = point.id;
      if (passedIds.includes(id)) return;

      const [lng, lat] = point.coordinates;
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

      <MapView
        route={route}
        userPosition={position}
        startPoint={startPoint}
        phase={phase}
        passedIds={passedIds}
      />
      {phase === 'beforeStart' && (
        <div className={styles.uiOverlay}>
          <MoveToStartLabel addr={route.start} />
        </div>
      )}

      {phase === 'readyToStart' && (
        <div className={styles.uiOverlay}>
          <ReadyToStartLabel handleStart={handleStart} />
        </div>
      )}

      {phase === 'tracking' && (
        <div className={styles.uiOverlay}>
          <SpeedMarker speed={speed} />
      </div>
      )}      
    </div>
    </>
  );
}

export default JourneyScreen;