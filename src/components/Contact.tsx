// src/components/Contact.tsx
import { Container, Form, Button } from 'react-bootstrap';
import '../App.css';

const Contact = () => (
  <div className="contact-bg">
    <Container className="contact-card">
      <h2 className="mb-4">🍃 Contact ReGen Mapper</h2>
      <p>Have a question, feedback, or collaboration idea? Reach out below.</p>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Your message..." />
        </Form.Group>
        <Button variant="success" type="submit">Send</Button>
      </Form>
    </Container>
  </div>
);

export default Contact;
