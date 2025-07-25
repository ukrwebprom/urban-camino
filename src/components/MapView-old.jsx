import { MapContainer, TileLayer, Marker, Popup, GeoJSON, CircleMarker, Circle, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import { routeGeoJson, checkPoints } from '../routes/padawan';
import UserMarker from './UserMarker';
import styles from './MapView.module.css';
import { useEffect } from 'react';

const routeStyle = {
  color: '#ffcc00',      // цвет линии
  weight: 5,             // толщина
  opacity: 1,          // прозрачность
  //dashArray: '5, 5',     // пунктир (если нужно)
  lineJoin: 'round'      // скругление углов
};

function FitBounds({ pos1, pos2 }) {
  const map = useMap();

  useEffect(() => {
    if (pos1 && pos2) {
      map.fitBounds([pos1, pos2], {
        padding: [50, 50]
      });
    }
  }, [pos1, pos2, map]);

  return null;
}

function MapView({ route, userPosition, startPoint, passedCheckpoints = [] }) {
  const routeCoords = route.coordinates.map(
    ([lng, lat]) => [lat, lng]
  );
  console.log(routeCoords);
  return (
    <MapContainer
      center={userPosition || [startPoint[1], startPoint[0]]}
      zoom={15}
      className={styles.map}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {userPosition && (
        <Marker position={userPosition} />
      )}

      {startPoint && (
        <Circle
          center={[startPoint[1], startPoint[0]]}
          radius={30}
          pathOptions={{ color: 'blue', fillColor: 'lightblue', fillOpacity: 0.4 }}
        />
      )}

      {userPosition && startPoint && (
        <FitBounds
        pos1={userPosition}
        pos2={[startPoint[1], startPoint[0]]} // lat, lng
        />
      )}

      {routeCoords && (
        <Polyline positions={routeCoords} color="black" />
      )}
    </MapContainer>
  );
}

export default MapView;
