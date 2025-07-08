import { useEffect, useState } from 'react'
import HomeScreen from './components/HomeScreen';
import RouteSelectScreen from './components/RouteSelectScreen';
import JourneyScreen from './components/JourneyScreen';
import FinishScreen from './components/FinishScreen';
import styles from './App.module.css';

function App() {
  const [step, setStep] = useState('finish');
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  // const [deferredPrompt, setDeferredPrompt] = useState(null);
  // const [installAvailable, setInstallAvailable] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('beforeinstallprompt', (e) => {
  //     e.preventDefault();
  //     setDeferredPrompt(e); // Сохраняем событие
  //     setInstallAvailable(true); // Показать кнопку
  //   });
  // }, []);

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
