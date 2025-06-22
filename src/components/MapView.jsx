import { MapContainer, TileLayer, Marker, Popup, GeoJSON, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import { routeGeoJson, checkPoints } from '../routes/padawan';
import UserMarker from './UserMarker';

const routeStyle = {
  color: '#ffcc00',      // цвет линии
  weight: 5,             // толщина
  opacity: 1,          // прозрачность
  //dashArray: '5, 5',     // пунктир (если нужно)
  lineJoin: 'round'      // скругление углов
};


function MapView() {
  const position = [46.47682810156394, 30.7649023743933]; 

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <UserMarker />

      {/* <GeoJSON data={routeGeoJson} style={routeStyle} />
      {checkPoints.map((point) => (
        <CircleMarker
        key={point.properties.id}
        center={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
        radius={8} // радиус круга в пикселях
        color="#ffcc00"
        weight={4}
        fillColor="#ffffff"
        fillOpacity={1}
      >
        <Popup>{point.properties.name}</Popup>
        </CircleMarker>
      ))} */}
    </MapContainer>
  );
}

export default MapView;
