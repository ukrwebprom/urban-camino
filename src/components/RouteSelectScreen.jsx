import routeMap from '../routes';
import RouteSketch from '../utils/RouteSketch';
import styles from './RouteSelectScreen.module.css';
import TopPanel from './TopPanel';

function RouteSelectScreen({ onSelect, onBack }) {
  return (
    <>
    <TopPanel title={'Routes'} />
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
                          <h4>Start</h4>
                          <p>{route.start}</p>
                        </div>
                        <div className={styles.startFinish}>
                          <h4>Finish</h4>
                          <p>{route.finish}</p>
                        </div>
                      </div>
                      <button onClick={() => onSelect(route.id)} className={styles.button}>Выбрать</button>
                      <p className={styles.distance}>{route.distance}<span> km</span></p>
                    </div>
                    
                    

                    
                </div>
            ))
        }
      
    </div>
    <button onClick={onBack}>back</button>
    </>
  );
}

export default RouteSelectScreen;