import styles from './FinishScreen.module.css';
import { useEffect, useState } from 'react'
import routeMap from '../routes';
import EnterNameForm from './EnterNameForm';
import GetСertificate from './GetСertificate';

function FinishScreen({ routeId }) {
  const [userName, setUserName] = useState(null);
  const route = routeMap.find((route) => route.id === routeId);

  const handleEnterName = (name) => setUserName(name);

  return (
    <div className={styles.main}>
      {!userName ? 
        <EnterNameForm handleEnterName={handleEnterName} routeName={route.name} /> : 
        <GetСertificate userName={userName} routeName={route.name} distance={route.distance} coordinates={route.coordinates} />
      }
    </div>
  );
}

export default FinishScreen;