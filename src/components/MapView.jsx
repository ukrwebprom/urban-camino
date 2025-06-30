import { useMap, MapContainer, TileLayer, Marker, Polyline, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import flag from '../assets/start.svg';
import user from '../assets/user-location.svg';
import { useEffect } from 'react';
import styles from './MapView.module.css';
import DrawArrowLine from '../utils/drawArrowLine';

const startIcon = L.icon({
  iconUrl: flag, // путь к иконке
  iconSize: [64, 64],                // размеры иконки
  iconAnchor: [16, 64],              // точка "указания" — нижний край
});

const userIcon = L.icon({
  iconUrl: user, // путь к иконке
  iconSize: [64, 64],                // размеры иконки
  iconAnchor: [32, 64],              // точка "указания" — нижний край
});

  // ⏱ FitBounds при фазе "toStart"
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

function isValidCoord(coord) {
  return (
    Array.isArray(coord) &&
    coord.length === 2 &&
    typeof coord[0] === 'number' &&
    typeof coord[1] === 'number' &&
    !isNaN(coord[0]) &&
    !isNaN(coord[1])
  );
}

function MapView({ route, userPosition, startPoint, phase }) {

  if (!route?.coordinates || !route?.checkPoints) return null;

  const routeCoords = route.coordinates.map(([lng, lat]) => [lat, lng]);
  const checkPointCoords = route.checkPoints.map(p => [p.coordinates[1], p.coordinates[0]]);
+

//   useEffect(() => {
//     if (phase === 'toStart' && userPosition && startPoint) {
//       map.fitBounds([userPosition, startPoint], {
//         padding: [50, 50],
//         maxZoom: 17,
//       });
//     }
//   }, [phase, userPosition, startPoint, map]);
console.log('startPoint:',startPoint);
console.log('userPosition:',userPosition);
  return (
    <MapContainer
      center={startPoint}
      zoom={15}
      className={styles.map}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Положение пользователя */}
{isValidCoord(userPosition) && (
  // <CircleMarker
  //   center={userPosition}
  //   radius={8}
  //   pathOptions={{ color: 'white', fillColor: 'blue', fillOpacity: 1, weight: 2 }}
  // />
  <Marker position={userPosition} icon={userIcon} />
)}

{/* Стартовая точка */}
{startPoint && (
  <>
  <Marker position={startPoint} icon={startIcon} />
  </>
)}

{userPosition && startPoint && (
  <DrawArrowLine from={userPosition} to={startPoint} />
)}

      {isValidCoord(userPosition) && startPoint && (
        <FitBounds
        pos1={userPosition}
        pos2={[startPoint[0], startPoint[1]]} // lat, lng
        />
      )}

      {/* Маршрут и чекпойнты — только в фазе "onRoute" */}
      {phase === 'onRoute' && (
        <>
          <Polyline positions={routeCoords} color="yellow" weight={4} />
          {checkPointCoords.map((pos, i) => (
            <CircleMarker key={i} center={pos} radius={6} pathOptions={{ color: 'white', fillColor: 'black', weight: 2 }} />
          ))}
        </>
      )}
    </MapContainer>
  );
}

export default MapView;