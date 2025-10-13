// src/components/JoinCampaign.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { createClient } from '@supabase/supabase-js';
import '../App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const JoinCampaign = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) {
          if (error.message.toLowerCase().includes('already registered')) {
            setError('User already exists. Switching to sign-in...');
            setIsSignUp(false);
            setLoading(false);
            return;
          }
          throw error;
        }

        if (!data?.session) {
          setSuccess('Sign-up successful! Please check your email to confirm your account.');
          setLoading(false);
          return;
        }

        setSuccess('Sign-up complete. Redirecting...');
        navigate('/planting-log');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;

        setSuccess('Sign-in successful! Redirecting...');
        navigate('/planting-log');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='join-bg' data-aos="fade-in">
      <div className='join-content'>
        <h2 className='mb-4'>🤝 Join the ReGen Campaign</h2>
        <p>Become a contributor, mapper, or ambassador for restoration.</p>
        <p>Log your plantings, share your zone, and inspire others to regenerate the planet.</p>

        <Form onSubmit={handleSubmit} className='mb-3'>
          <Form.Group controlId='formEmail' className='mb-2'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder='Enter email'
              autoFocus
              isInvalid={!!error}
            />
          </Form.Group>

          <Form.Group controlId='formPassword' className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder='Enter password'
              isInvalid={!!error}
            />
            <Form.Control.Feedback type='invalid'>
              {error}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant='success' type='submit' disabled={loading} className='w-100'>
            {loading ? <Spinner animation='border' size='sm' /> : isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </Form>

        <Button
          variant='link'
          onClick={() => {
            setIsSignUp(!isSignUp);
            resetForm();
          }}
          className='w-100'
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Button>

        {success && <Alert variant='success' className='mt-2'>{success}</Alert>}
      </div>
    </div>
  );
};

export default JoinCampaign;
