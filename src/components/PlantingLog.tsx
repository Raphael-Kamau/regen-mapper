// PlantingLog.tsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { supabase } from '../lib/supabaseClient';
import 'aos/dist/aos.css';
import '../App.css';

interface PlantingFormData {
    species: string;
    quantity: string;
    location: string;
    date: string;
    notes: string;
}

const PlantingLog = () => {
    const [formData, setFormData] = useState<PlantingFormData>({
        species: '',
        quantity: '',
        location: '',
        date: new Date().toISOString().slice(0, 10),
        notes: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // First test the connection by checking if we can fetch data
            const { data: testData, error: testError } = await supabase
                .from('planting_logs')
                .select('*')
                .limit(1);

            if (testError) {
                console.error('Connection test failed:', testError);
                throw new Error('Failed to connect to database');
            }

            console.log('Connection successful, existing logs:', testData);

            // Proceed with insertion
            const { error } = await supabase
                .from('planting_logs')
                .insert([{
                    ...formData,
                    quantity: parseInt(formData.quantity) || 0
                }]);

            if (error) throw error;

            console.log('Data inserted successfully');

            setStatus('success');
            setFormData({
                species: '',
                quantity: '',
                location: '',
                date: new Date().toISOString().slice(0, 10),
                notes: ''
            });
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    return (
        <Container className='glass-card' data-aos="fade-in">
            <h2 className='mb-4'>🌱 Log a Tree Planting</h2>
            <p>Every time you plant and log, you become part of our growing family. A family rooted in restoration, united by purpose, and connected through every seed sown.</p>

            {status === 'success' && <Alert variant='success'>Log submitted successfully!</Alert> }
            {status === 'error' && <Alert variant='danger'>Something went wrong. Please try again.</Alert> }
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Species</Form.Label>
                        <Form.Control
                        type='text'
                        name='species'
                        value={formData.species}
                        onChange={handleChange}
                        placeholder='e.g Grevillea'
                        required
                        />
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                        type='number'
                        name='quantity'
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder='Number of trees'
                        required
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Location</Form.Label>
                        <Form.Control 
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                        placeholder='GPS or zone name'
                        required
                        />
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Date</Form.Label>
                            <Form.Control 
                            type='date'
                            name='date'
                            value={formData.date}
                            onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className='mb-3'>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control 
                    as="textarea"
                    rows={3}
                    name='notes'
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder='Optional comments'
                    />
                </Form.Group>

                <Button variant='success' type='submit'>Submit Log</Button>
            </Form>
        </Container>
    );
};

export default PlantingLog;
