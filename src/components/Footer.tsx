import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const Footer: React.FC = () => (
  <footer className="site-footer mt-5">
    <Container>
      <Row>
        <Col md={6}>
          <p>© {new Date().getFullYear()} ReGen Mapper. All rights reserved.</p>
        </Col>
        <Col md={6} className="text-md-end">
          <a href="/" className="mx-2">Home</a>
          <a href="/" className="mx-2">Map</a>
          <a href="/" className="mx-2">Contact</a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
