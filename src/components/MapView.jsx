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

function UserToCenter({pos}) {
  console.log(pos);
  const map = useMap();
  map.setView(pos, map.getZoom());
}

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

function MapView({ route, userPosition, startPoint, phase, passedIds }) {

  if (!route?.coordinates || !route?.checkPoints) return null;
  const routeCoords = route.coordinates.map(([lng, lat]) => [lat, lng]);
  const checkPoints = route.checkPoints.map(p => 
    {
      return {
        id: p.id, 
        name: p.name,
        coordinates: [p.coordinates[1], p.coordinates[0]]
      }
    }
  );

  return (
    <MapContainer
      center={startPoint}
      zoom={15}
      className={styles.map}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {isValidCoord(userPosition) && (<Marker position={userPosition} icon={userIcon} />)}

      {startPoint && (<Marker position={startPoint} icon={startIcon} />)}

      {phase === 'beforeStart' && userPosition && startPoint && (<DrawArrowLine from={userPosition} to={startPoint} />)}

      {isValidCoord(userPosition) && startPoint && (phase === 'readyToStart' || phase === 'beforeStart') && (
        <FitBounds
        pos1={userPosition}
        pos2={[startPoint[0], startPoint[1]]} // lat, lng
        />
      )}

      {phase === 'tracking' && isValidCoord(userPosition)&& (
        <>
        {console.log(userPosition)};
        <UserToCenter pos = {userPosition} />
        </>
      )}

      {/* Маршрут и чекпойнты — только в фазе "onRoute" */}
      {(phase === 'readyToStart' || phase === 'tracking') && (
        <>
          <Polyline positions={routeCoords} color="yellow" weight={4} />
          {checkPoints.map((pos, i) => {
              return passedIds.includes(pos.id) ? 
              (<CircleMarker key={i} center={pos.coordinates} radius={6} pathOptions={{ color: 'yellow', fillColor: 'yellow', fillOpacity: 1, weight: 4 }} />) :
              (<CircleMarker key={i} center={pos.coordinates} radius={6} pathOptions={{ color: 'yellow', fillColor: '#999', fillOpacity: 1, weight: 4 }} />)
              }
          )}
        </>
      )}
    </MapContainer>
  );
}

export default MapView;