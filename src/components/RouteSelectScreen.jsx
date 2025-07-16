import routeMap from '../routes';
import RouteSketch from '../utils/RouteSketch';
import styles from './RouteSelectScreen.module.css';
import TopPanel from './TopPanel';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../AuthProvider';

function RouteSelectScreen({ onSelect, onBack }) {
  const { t } = useTranslation();
  const { user, handleLogin, handleLogout } = useAuth();
  return (
    <>
    
    <div className={styles.container}>
    <TopPanel title={'Routes'} showBack={true} onBack={onBack} user={user} />
        {
            routeMap.map((route) => (
                <div key={route.id} className={styles.routeCard}>
                    <div className={styles.topLine}>
                      <h3 className={styles.title}>{route.name}</h3>
                      <button onClick={() => onSelect(route.id)} className={styles.button}>{t('Select')}</button>
                    </div>
                    
                    <p className={styles.description}>{route.description}</p>
                    <div className={styles.routeInfo}>
                      <RouteSketch route = {route.coordinates}
                      checkpoints={route.checkPoints.map((point) => (point.coordinates))} 
                      className={styles.routeMap} />

                      <div className={styles.bottomLine}>
                      <div className={styles.routeData}>
                        <div className={styles.startFinish}>
                          <h4>{t('Start')}</h4>
                          <p>{route.start}</p>
                        </div>
                        <div className={styles.startFinish}>
                          <h4>{t('Finish')}</h4>
                          <p>{route.finish}</p>
                        </div>
                      </div>
                      
                      <p className={styles.distance}>{route.distance}<span> km</span></p>
                      </div>
                    </div>
                    
                    

                    
                </div>
            ))
        }
      
    </div>
    </>
  );
}

export default RouteSelectScreen;