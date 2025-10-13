// src/components/Footer.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaLeaf, FaChartLine } from 'react-icons/fa';
import { IconType } from 'react-icons';
import '../App.css';

interface IconComponentProps {
  icon?: IconType;
  size?: number;
}

const IconComponent: React.FC<IconComponentProps> = ({ icon: Icon, size = 20 }) => {
  if (!Icon) return null;
  return <Icon size={size} />;
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer-bg text-light py-4 mt-5'>
      <Container>
        <Row className='align-items-center'>
          <Col md={6} className='text-center text-md-left mb-3 mb-md-0'>
            <p className='mb-0'>
              © {currentYear} ReGen Mapper 🌱 | Built with love
            </p>
          </Col>
          <Col md={6} className='text-center text-md-right'>
            <a href='/planting-log' className='footer-icon mx-2' title='Planting Log'>
              <IconComponent icon={FaEnvelope} />
            </a>
            <a href='/impact-dashboard' className='footer-icon mx-2' title='Impact Dashboard'>
              <IconComponent icon={FaChartLine} />
            </a>
            <a href='/map' className='footer-icon mx-2' title='View Map'>
              <IconComponent icon={FaLeaf} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
// src/components/Footer.tsx