import { useEffect, useState } from 'react'
import HomeScreen from './components/HomeScreen';
import RouteSelectScreen from './components/RouteSelectScreen';
import JourneyScreen from './components/JourneyScreen';
import FinishScreen from './components/FinishScreen';
import styles from './App.module.css';
import usePersistentState from './hooks/usePersistentState';

function App() {
  //const [step, setStep] = useState('home');
  const [step, setStep] = usePersistentState('step', 'home');
  const [selectedRouteId, setSelectedRouteId] = usePersistentState('selectedRouteId', null);


  useEffect(() => {
  if (selectedRouteId) {
    setStep('journey');
  }
  }, [selectedRouteId]);

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
  
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
  
    return () => window.removeEventListener('resize', setViewportHeight);
  }, []);
  console.log(step);
  return (
    <div className={styles.main}>
      {step === 'home' && <HomeScreen onNext={() => setStep('select')} />}
      {step === 'select' && <RouteSelectScreen 
        onSelect={(routeId) => {
          setSelectedRouteId(routeId);
          }
        } 
        onBack={()=> setStep('home')} />}
      {step === 'journey' && (
        <>
        <JourneyScreen 
        key={selectedRouteId}
        routeId={selectedRouteId} 
        onComplete={() => setStep('finish')}
        onBack={()=> setStep('select')} />
        </>
      )}
      {step === 'finish' && <FinishScreen 
      routeId={'padawan'} 
      />}

    </div>
  );
}

export default App
