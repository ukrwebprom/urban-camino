import { useState } from 'react'
import MapView from './components/MapView';
import ControlPanel from './components/ControlPanel';

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapView />
      <ControlPanel />
    </div>
  );
}

export default App
