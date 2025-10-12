// src/components/Landing.tsx
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../App.css';

interface LandingProps {
  onNavigate: (view: 'map' | 'log' | 'dashboard') => void;
}

const Landing = ({ onNavigate }: LandingProps) => (
  <Container fluid className="landing-bg">
    <Row className="vh-100 justify-content-center align-items-center text-center">
      <Col md={8}>
        <img src="/assets/logo.png" alt="ReGen Mapper Logo" className="logo-landing" loading='lazy' />
        <h1 className="display-4">ReGen Mapper</h1>
        <p className="lead">Mapping restoration, one tree at a time.</p>
        <div className="mt-4">
          <Button variant="success" className="mx-2" onClick={() => onNavigate('map')}>
            View Map
          </Button>
          <Button variant="outline-light" className="mx-2" onClick={() => onNavigate('log')}>
            Log Planting
          </Button>
          <Button variant="outline-light" className="mx-2" onClick={() => onNavigate('dashboard')}>
            Impact Dashboard
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
);

export default Landing;
