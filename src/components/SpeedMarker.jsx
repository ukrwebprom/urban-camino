import styles from './SpeedMarker.module.css';
import { useEffect, useState } from 'react';
import getDistanceFromLatLonInKm from '../utils/getDistanceFromLatLonInKm';

function SpeedMarker({userPosition}) {

    const [prevData, setPrevData] = useState(null);
    const [speedHistory, setSpeedHistory] = useState([]);
    const [speedWarning, setSpeedWarning] = useState(false);
const [speed, setSpeed] = useState(0);

function median(arr) {
    const sorted = [...arr].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  useEffect(() => {
    if (!userPosition) return;
  
    const now = Date.now();
  
    if (prevData) {
      const dt = (now - prevData.time) / 1000; // секунды
      if (dt < 5) return;
  
      const distance = getDistanceFromLatLonInKm(
        prevData.pos[0], prevData.pos[1],
        userPosition[0], userPosition[1]
      );
  
      if (distance < 0.005) return; // менее 5 метров — шум
      const speed = (distance / dt) * 3600; // км/ч
      if (speed > 20) return; // скачок
  
      const updated = [...speedHistory.slice(-4), speed];
      setSpeedHistory(updated);
  
      const medSpeed = median(updated);
      console.log(`Медианная скорость: ${medSpeed.toFixed(2)} км/ч`);
      setSpeed(medSpeed.toFixed(2));
      setSpeedWarning(medSpeed > 7);
    }
  
    setPrevData({ pos: userPosition, time: now });
  }, [userPosition]);


    return (
            <div className={styles.speedOmeter}>
                <p>{speed}<span>km/h</span></p>
            </div>
    )   
}

export default SpeedMarker;