import { Button, Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import { createClient } from '@supabase/supabase-js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from 'react';

interface LandingProps {
  onNavigate: (view: 'map' | 'log' | 'dashboard' | 'contact' | 'join') => void;
}

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

const Landing = ({ onNavigate }: LandingProps) => {
  const [impact, setImpact] = useState({ trees: 0, zones: 0, contributors: 0 });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 120,
    });

    const fetchImpact = async () => {
      const { data, error } = await supabase
        .from('impact_status')
        .select('trees_planted, zones_mapped, contributors')
        .single();

      if (!error && data) {
        setImpact({
          trees: data.trees_planted,
          zones: data.zones_mapped,
          contributors: data.contributors,
        });
      }
    };

    fetchImpact();
  }, []);

  return (
    <Container fluid className="landing-bg" data-aos="fade-up">
      {/* Hero Section */}
      <Row className="vh-75 justify-content-center align-items-center text-center">
        <Col md={8}>
          <img src="/assets/logo.png" alt="ReGen Mapper Logo" className="logo-landing" loading="lazy" />
          <h1 className="display-4">ReGen Mapper</h1>
          <p className="lead">Mapping restoration, one tree at a time.</p>
          <div className="mt-4">
            <Button variant="success" className="mx-2" onClick={() => onNavigate('map')}>View Map</Button>
            <Button variant="outline-light" className="mx-2" onClick={() => onNavigate('log')}>Log Planting</Button>
            <Button variant="outline-light" className="mx-2" onClick={() => onNavigate('dashboard')}>Impact Dashboard</Button>
          </div>
        </Col>
      </Row>

      {/* About Section */}
      <Row className="about-section py-5" data-aos="fade-up">
        <Col md={{ span: 8, offset: 2 }} className="text-left">
          <h2>About ReGen Mapper</h2>
          <hr />
          <p className="lead">
            <strong>ReGen Mapper is more than a map, it's a movement.</strong> Our platform brings together communities, organizations, and passionate individuals to restore ecosystems, one tree at a time. Track your planting projects, showcase your impact, and inspire others with real-time progress and transparent data. Join us in making restoration visible, actionable, and accessible for everyone. <strong>Together, we can regenerate the planet.</strong>
          </p>
        </Col>
      </Row>

      {/* Impact Highlights Section */}
      <Row className="impact-section py-5 text-center" data-aos="fade-up">
        <Col md={{ span: 8, offset: 2 }}>
          <h2>🌍 Our Impact So Far</h2>
          <hr />
          <p className="lead">Together, we've logged:</p>
          <Row className="mt-4">
            <Col md={4}>
              <div className="stat-box">
                <h3>{impact.trees.toLocaleString()}</h3>
                <p>Trees Planted</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-box">
                <h3>{impact.zones}</h3>
                <p>Zones Mapped</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="stat-box">
                <h3>{impact.contributors}</h3>
                <p>Contributors</p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* How It Works Section */}
      <Row className="how-it-works-section py-5 text-left" data-aos="fade-up">
        <Col md={{ span: 8, offset: 2 }}>
          <h2>How It Works</h2>
          <hr />
          <p className="lead">Start regenerating in 3 simple steps:</p>
          <Row className="mt-4">
            <Col md={4}>
              <h4>1. Join</h4>
              <p>Create your account and become a mapper.</p>
            </Col>
            <Col md={4}>
              <h4>2. Log</h4>
              <p>Record your planting efforts and locations.</p>
            </Col>
            <Col md={4}>
              <h4>3. Track</h4>
              <p>Visualize your impact and inspire others.</p>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Call to Action Section */}
      <Row className="cta-section py-5 text-left" data-aos="fade-up">
        <Col md={{ span: 8, offset: 2 }}>
          <h2>Ready to Regenerate?</h2>
          <p className="lead">Join the movement and start mapping your impact today.</p>
          <Button variant="success" size="lg" onClick={() => onNavigate('join')}>
            Join the Campaign
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
