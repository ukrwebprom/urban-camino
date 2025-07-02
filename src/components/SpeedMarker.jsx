import styles from './SpeedMarker.module.css';
import { useEffect, useState } from 'react';
import getDistanceFromLatLonInKm from '../utils/getDistanceFromLatLonInKm';

function SpeedMarker({userPosition}) {

const [prevPosition, setPrevPosition] = useState(null);
const [prevTimestamp, setPrevTimestamp] = useState(null);
const [speedWarning, setSpeedWarning] = useState(false);
const [speed, setSpeed] = useState(0);

useEffect(() => {
  if (userPosition && prevPosition) {
    const now = Date.now();
    const dt = (now - prevTimestamp) / 1000; // время в секундах

    if (dt > 0) {
      const d = getDistanceFromLatLonInKm(
        prevPosition[0], prevPosition[1],
        userPosition[0], userPosition[1]
      );
      const speed = (d / dt) * 3600; // км/ч

      console.log(`Speed: ${speed.toFixed(2)} км/ч`);
      setSpeed(speed.toFixed(2));

      setSpeedWarning(speed > 7);
    }

    setPrevTimestamp(now);
  }

  if (userPosition) {
    setPrevPosition(userPosition);
  }
}, [userPosition]);
    return (
            <div className={styles.speedOmeter}>
                <p>{speed}<span>km/h</span></p>
            </div>
    )   
}

export default SpeedMarker;