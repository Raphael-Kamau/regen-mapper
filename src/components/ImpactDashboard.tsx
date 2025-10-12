// src/components/ImpactDashboard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import '../App.css';

const ImpactDashboard = () => {
  const [stats, setStats] = useState({ totalTrees: 0, zones: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from('planting_logs').select('quantity, location');
      if (data) {
        const totalTrees = data.reduce((sum, log) => sum + Number(log.quantity), 0);
        const zones = new Set(data.map(log => log.location)).size;
        setStats({ totalTrees, zones });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <Container className="glass-card">
      <h2 className="mb-4">🌍 Impact Dashboard</h2>
      <p>Every tree planted is a story of hope, resilience, and regeneration. Through community-driven mapping and transparent logging, we're building a living archive of restoration—zone by zone, root by root.</p>
      <ul>
        <li>Total Trees Planted: A growing forest of action.</li>

        <li>Zones Restored: Diverse ecosystems coming back to life.</li>

        <li>Contributors: Mappers, planters, and changemakers united by purpose.</li>
      </ul>
      <p>Together, we're not just tracking impact, we're amplifying it.</p>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row>
          <Col md={6}>
            <Card bg="success" text="white" className="mb-3">
              <Card.Body>
                <Card.Title>Trees Planted</Card.Title>
                <Card.Text>{stats.totalTrees.toLocaleString()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card bg="info" text="white" className="mb-3">
              <Card.Body>
                <Card.Title>Zones Restored</Card.Title>
                <Card.Text>{stats.zones}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ImpactDashboard;
