import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';
import '../App.css';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('contact')
        .insert([{
          ...formData,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="contact-bg">
      <Container className="contact-card">
        <h2 className="mb-4">🍃 Contact ReGen Mapper</h2>
        <p>Have a question, feedback, or collaboration idea? Reach out below.</p>
        
        {status === 'success' && (
          <Alert variant="success" className="mb-3">
            Thank you for your message! We'll get back to you soon.
          </Alert>
        )}
        
        {status === 'error' && (
          <Alert variant="danger" className="mb-3">
            Sorry, there was an error sending your message. Please try again.
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your message..."
              required
            />
          </Form.Group>

          <Button 
            variant="success" 
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send'}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Contact;
