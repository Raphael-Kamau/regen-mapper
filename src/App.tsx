import { useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './components/Landing';
import MapView from './components/MapView';
import PlantingLog from './components/PlantingLog';
import ImpactDashboard from './components/ImpactDashboard';
import Contact from './components/Contact';
import JoinCampaign from './components/JoinCampaign';
import './App.css';

function App() {
  const [view, setView] = useState<'landing' | 'map' | 'log' | 'dashboard' | 'contact' | 'join'>('landing');

  return (
    <div className='App'>
      <Navbar bg="light" expand="lg" className='compact-navbar px-3'>
        <Navbar.Brand onClick={() => setView('landing')} style= {{ cursor: 'pointer' }}>
          <img src='/assets/logo.png' alt='ReGen Mapper' className='logo' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='main-nabar' />
        <Navbar.Collapse id='main-navbar'>
          <Nav className='me-auto'>
            <Nav.Link onClick={() => setView('map')}>Map</Nav.Link>
            <Nav.Link onClick={() => setView('log')}>Log Planting</Nav.Link>
            <Nav.Link onClick={() => setView('dashboard')}>Impact</Nav.Link>
            <Nav.Link onClick={() => setView('contact')}>Contact</Nav.Link>
          </Nav>
          <Button variant='success' onClick={() => setView('join')}>Join Campaign</Button>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className='mt-4'>
        {view === 'landing' && <Landing onNavigate={setView} />}
        {view === 'map' && <MapView />}
        {view === 'log' && <PlantingLog />}
        {view === 'dashboard' && <ImpactDashboard />}
        {view === 'contact' && <Contact />}
        {view === 'join' && <JoinCampaign />}
      </Container>
    </div>
  );
}

export default App;
 
