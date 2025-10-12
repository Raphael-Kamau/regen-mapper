// src/components/MapView.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Container } from 'react-bootstrap';

const MapView = () => {
  const thikaCoords: [number, number] = [-1.045, 37.070];

  return (
    <Container fluid className="glass-card">
      <h2 className="mb-3">🌍 ReGen Mapper: Restoration Zones</h2>
      <MapContainer
        center={thikaCoords}
        zoom={8}
        style={{ height: '80vh', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        <Marker position={thikaCoords}>
          <Popup>Thika — Reforestation Hub</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default MapView;
