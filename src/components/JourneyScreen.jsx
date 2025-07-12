import { useEffect, useState } from 'react';
import usePoints from '../hooks/usePoints';
import MapView from './MapView';
import routeMap from '../routes';
import getDistance from '../utils/getDistance';
import styles from './JourneyScreen.module.css';
import TopPanel from './TopPanel';
import MoveToStartLabel from './MoveToStartLabel';
import ReadyToStartLabel from './ReadyToStartLabel';
import SpeedMarker from './SpeedMarker';
import usePersistentState from '../hooks/usePersistentState';

function JourneyScreen({phase, setPhase, routeId, onComplete, onBack }) {
  
  const [position, setPosition] = useState(null);
  const [passedIds, setPassedIds] = useState([]);
  const [speed, setSpeed] = useState(null);
  const { points, addCheckpoint, finishRoute, resetPoints } = usePoints();
  const {showGain, setShowGain} = useState(false);

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

    return () => {
      navigator.geolocation.clearWatch(watchId);}
  }, [passedIds]);

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

    if (distance < 50 && phase !== 'tracking') {
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
        addCheckpoint();
        setShowGain(true);
        setShowGain(status => !status);
      }
    });
  }

  useEffect(() => {
    if(showGain) setShowGain(false);
  }, [showGain])

  useEffect(() => {
    if (
      phase === 'tracking' &&
      passedIds.length === route.checkPoints.length
    ) {
      finishRoute();
      onComplete();
    }
  }, [passedIds, route, phase, onComplete]);

  const handleStart = () => setPhase('tracking');

  return (
    <>
    <TopPanel 
      points={points} 
      title={route.name} 
      mode={phase}
      onBack={onBack}
    />

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
          {showGain && <div className={styles.pointsPopup}>+10</div>}
      </div>
      )}      
    </div>
    </>
  );
}

export default JourneyScreen;