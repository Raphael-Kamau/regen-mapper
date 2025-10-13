// src/components/Landing.tsx
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../App.css';

interface LandingProps {
  onNavigate: (view: 'map' | 'log' | 'dashboard' | 'contact' | 'join') => void;
}

const Landing = ({ onNavigate }: LandingProps) => (
  <Container fluid className="landing-bg">
    <Row className="vh-75 justify-content-center align-items-center text-center">
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

    <Row className="about-section py-5">
      <Col md={{ span: 8, offset: 2 }} className="text-center">
        <h2>About ReGen Mapper</h2>
        <p className="lead">
          ReGen Mapper empowers communities and organizations to document restoration projects,
          track tree plantings, and visualize progress over time. We aim to make ecological
          restoration data actionable and accessible.
        </p>
        <div className="mt-3">
          <Button variant="outline-light" className="mx-2" onClick={() => onNavigate('map')}>
            Explore the Map
          </Button>
          <Button variant="success" className="mx-2" onClick={() => onNavigate('contact')}>
            Contact Us
          </Button>
        </div>
      </Col>
    </Row>

  </Container>
);

export default Landing;
