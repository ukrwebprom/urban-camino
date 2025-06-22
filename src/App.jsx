import { useEffect, useState } from 'react'
import MapView from './components/MapView';
import ControlPanel from './components/ControlPanel';
import HomeScreen from './components/HomeScreen';
import RouteSelectScreen from './components/RouteSelectScreen';
import JourneyScreen from './components/JourneyScreen';
import FinishScreen from './components/FinishScreen';

function App() {
  const [step, setStep] = useState('home');
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


  return (
    <div style={{ height: "100vh", width: "100vw" }}>

      {step === 'home' && <HomeScreen onNext={() => setStep('select')} />}
      {step === 'select' && <RouteSelectScreen 
        onSelect={(routeId) => {
          setSelectedRouteId(routeId);
          setStep('journey')}
        } 
        onBack={()=> setStep('home')} />}
      {step === 'journey' && <JourneyScreen routeId={selectedRouteId} 
        onComplete={() => setStep('finish')}
        onBack={()=> setStep('select')} />}
      {step === 'finish' && <FinishScreen />}

    </div>
  );
}

export default App
