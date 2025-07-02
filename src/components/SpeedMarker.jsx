import styles from './SpeedMarker.module.css';
import { useEffect, useState, useRef } from 'react';
import getDistanceFromLatLonInKm from '../utils/getDistanceFromLatLonInKm';
import TrackingUI from './TrackingUI';

function SpeedMarker({userPosition}) {

    const userPositionRef = useRef(userPosition);

    const [prevData, setPrevData] = useState(null);
    const prevDataRef = useRef(null);
    const [speedHistory, setSpeedHistory] = useState([]);
    const [speedWarning, setSpeedWarning] = useState(false);
    const [speed, setSpeed] = useState(0);
    const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());
    const idleTimeout = useRef(null);

function median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }
  useEffect(() => {
    userPositionRef.current = userPosition;
  }, [userPosition]);

  useEffect(() => {
    const intervalId = setInterval(() => {

        const currentPos = userPositionRef.current;

        if (!currentPos) return;

        const now = Date.now();
        const prevData = prevDataRef.current;

        if (prevData) {
           const dt = (now - prevData.time) / 1000;
  
           const dist = getDistanceFromLatLonInKm(
           prevData.pos[0], prevData.pos[1],
           currentPos[0], currentPos[1]
           );
  
           const sp = (dist / dt) * 3600;
           setSpeed(sp.toFixed(2));

         }

         prevDataRef.current = { pos: currentPos, time: now };

    }, 1000);

    return () => {
      clearInterval(intervalId);
      console.log('интервал очищен');
    };
  }, []);


//   useEffect(() => {
//     if (!userPosition) return;
  
//     const now = Date.now();
//     setLastUpdateTime(now);
  
//     // Очистить старый таймер
//     if (idleTimeout.current) clearTimeout(idleTimeout.current);
  
//     // Новый таймер: если за 12 секунд не было движения — сбросить скорость
//     idleTimeout.current = setTimeout(() => {
//       console.log('⏱ Нет движения — сбрасываем скорость');
//       setSpeedHistory([]);
//       setSpeedWarning(false);
//       setSpeed(0);
//     }, 5000);
  
//     if (prevData) {
//       const dt = (now - prevData.time) / 1000;
//       if (dt < 5) return;
  
//       const dist = getDistanceFromLatLonInKm(
//         prevData.pos[0], prevData.pos[1],
//         userPosition[0], userPosition[1]
//       );
  
//       if (dist < 0.005) return;
  
//       const speed = (dist / dt) * 3600;
//       if (speed > 20) return;
  
//       const updated = [...speedHistory.slice(-4), speed];
//       setSpeedHistory(updated);
  
//       const medSpeed = median(updated);
//       console.log(`Медианная скорость: ${medSpeed.toFixed(2)} км/ч`);
//       setSpeed(medSpeed.toFixed(2));
//       setSpeedWarning(medSpeed > 7);
//     }
  
//     setPrevData({ pos: userPosition, time: now });
//   }, [userPosition]);


    return (
            <div className={styles.speedOmeter}>
                <p>{speed}<span>km/h</span></p>
                <TrackingUI />
            </div>
    )   
}

export default SpeedMarker;