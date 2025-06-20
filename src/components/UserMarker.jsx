import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import walkerGif from '../assets/walker.gif';

const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/64/64113.png',
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });
  
  const animatedIcon = new L.Icon({
    iconUrl: walkerGif,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

function UserMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();
  
    useEffect(() => {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setPosition(coords);
          map.setView(coords);
        },
        (err) => {
          console.error('Ошибка геолокации:', err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        }
      );
  
      return () => navigator.geolocation.clearWatch(watchId);
    }, [map]);
  
    if (!position) return null;
  
    return (
      <Marker position={position} icon={animatedIcon}>
        <Popup>Вы здесь</Popup>
      </Marker>
    );
  }
  
  export default UserMarker;