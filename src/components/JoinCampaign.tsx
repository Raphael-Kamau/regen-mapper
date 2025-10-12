// src/components/JoinCampaign.tsx
import { Button } from 'react-bootstrap';
import '../App.css';

const JoinCampaign = () => (
  <div className='join-bg'>
    <div className='join-content'>
      <h2 className='mb-4'>🤝 Join the ReGen Campaign</h2>
      <p>Become a contributor, mapper, or ambassador for restoration.</p>
      <p>Log your plantings, share your zone, and inspire others to regenerate the planet.</p>
      <Button variant='success' href='https://forms.gle/regen-mapper-form' target='_blank'>
      Sign Up Now
      </Button>
    </div>
  </div>
);

export default JoinCampaign;