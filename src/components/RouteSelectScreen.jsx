import routeMap from '../routes';
import RouteSketch from '../utils/RouteSketch';
import styles from './RouteSelectScreen.module.css';
import TopPanel from './TopPanel';
import { useTranslation } from 'react-i18next';

function RouteSelectScreen({ onSelect, onBack }) {
  const { t } = useTranslation();
  return (
    <>
    <TopPanel title={'Routes'} showBack={true} onBack={onBack} />
    <div className={styles.container}>
        {
            routeMap.map((route) => (
                <div key={route.id} className={styles.routeCard}>
                    <h3 className={styles.title}>{route.name}</h3>
                    <p className={styles.description}>{route.description}</p>
                    <div className={styles.routeInfo}>
                      <RouteSketch route = {route.coordinates}
                      checkpoints={route.checkPoints.map((point) => (point.coordinates))} 
                      className={styles.routeMap} />
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
                      <button onClick={() => onSelect(route.id)} className={styles.button}>{t('Select')}</button>
                      <p className={styles.distance}>{route.distance}<span> km</span></p>
                    </div>
                    
                    

                    
                </div>
            ))
        }
      
    </div>
    </>
  );
}

export default RouteSelectScreen;