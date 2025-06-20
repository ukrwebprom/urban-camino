import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { routeGeoJson } from '../routes/padawan';
import UserMarker from './UserMarker';

function MapView() {
  const position = [46.47682810156394, 30.7649023743933]; 

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <UserMarker />

      <GeoJSON data={routeGeoJson} />
    </MapContainer>
  );
}

export default MapView;
