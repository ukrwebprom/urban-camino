import { useEffect, useState } from 'react'
import MapView from './components/MapView';
import ControlPanel from './components/ControlPanel';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installAvailable, setInstallAvailable] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e); // Сохраняем событие
      setInstallAvailable(true); // Показать кнопку
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapView />
      <ControlPanel 
      showInstall={installAvailable}
      onInstallClick={() => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('PWA установлена');
              } else {
                console.log('Пользователь отменил установку');
              }
              setInstallAvailable(false);
              setDeferredPrompt(null);
            });
          }
        }}
      />
    </div>
  );
}

export default App
