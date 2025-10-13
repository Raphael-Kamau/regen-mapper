
// src/components/Footer.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

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
            <a href='/planting-log' className='footer-link mx-2'>Planting Log</a>
            <a href='/impact-dashboard' className='footer-link mx-2'>Impact Dashboard</a>
            <a href='/map' className='footer-link mx-2'>View Map</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;